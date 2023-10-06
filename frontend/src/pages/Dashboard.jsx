import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../componets/Spinner";
import GoalForm from "../componets/GoalForm";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.goals
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        dispatch(getGoals());

        return () => {
            dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    if (isLoading) {
        <Spinner />;
    }
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />
        </>
    );
}

export default Dashboard;
