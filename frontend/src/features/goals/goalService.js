import axios from "axios";

const API_URL = "/api/goals/";

// Get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    // if (response.data) {
    //     localStorage.setItem("goal", JSON.stringify(response.data));
    // }
    return response.data;
};

// Set goal
const setGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, goalData, config);
    // if (response.data) {
    //     localStorage.setItem("goal", JSON.stringify(response.data));
    // }
    return response.data;
};

// Update goal
const updateGoal = async (goalData) => {
    const response = await axios.post(API_URL + "", goalData);
    // if (response.data) {
    //     localStorage.setItem("goal", JSON.stringify(response.data));
    // }
    return response.data;
};

// Delete goal
const deleteGoal = async (goalData) => {
    const response = await axios.delete(API_URL + "", goalData);
    if (response.data) {
        localStorage.removeItem("goal");
    }
};

const goalService = { getGoals, setGoal, updateGoal, deleteGoal };

export default goalService;
