import { useEffect, useState } from "react";

const useTaskAlerts = (dueDate) => {
    const [clase, setClase] = useState("");

    // Función reutilizable
    const checkTaskStatus = (date) => {
        if (!date) return;

        const today = new Date();
        const due = new Date(date);
        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);
        const diffDays = (due - today) / (1000 * 60 * 60 * 24); 

        if (diffDays < 0) return "expire";
        if (diffDays <= 2) return "toExpire";
        return;
    };

    useEffect(() => {
        setClase(checkTaskStatus(dueDate));
    }, [dueDate]);

    return { clase, checkTaskStatus };
};

export default useTaskAlerts;
