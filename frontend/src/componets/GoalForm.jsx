import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getGoals, setGoal, reset } from "../features/goals/goalSlice";
import Spinner from "../componets/Spinner";

function GoalForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const { title, description } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { goals, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.goals
    );
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || goals) {
            navigate("/");
        }

        dispatch(reset());
    }, [goals, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Unauthorized access!");
        } else {
            const goalData = {
                title,
                description,
                user: user._id,
            };

            dispatch(setGoal(goalData));
        }
        setFormData({ title: "", description: "" });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={title}
                        placeholder="Enter a title"
                        onChange={onChange}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        placeholder="Enter your goal"
                        onChange={onChange}
                        id="description"
                        name="description"
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
