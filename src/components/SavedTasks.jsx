import React, { useEffect, useState } from "react";
import "./savedTasks.css";
import { FaTrashAlt} from "react-icons/fa";

const SavedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("constructionTasks")) || [];
    setTasks(saved);
  }, []);

  const handleDeleteTask = (indexToDelete) => {
    const updated = tasks.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("constructionTasks", JSON.stringify(updated));
    setTasks(updated);
  };

  return (
    <div className="saved-tasks-container">
      <h2>Saved Construction Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks saved yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div className="task-card" key={index}>
            <div className="task-header">
              <p><strong>Project: </strong>{task.project}</p>
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleDeleteTask(index)}
              />
            </div>
             <p><strong>Site:</strong> {task.site}</p>
            <p><strong>Description:</strong> {task.description}</p>

            <div className="task-info">
              <p><strong>Work Category:</strong> {task.workCategory}</p>
              <p><strong>Vendor:</strong> {task.vendor}</p>
              <p><strong>Unit:</strong> {task.unit}</p>
              <p><strong>Quantity:</strong> {task.qty}</p>
              <p><strong>Assigned User:</strong> {task.assignUser}</p>
              <p><strong>Schedule:</strong> {task.schedule ? "Available" : "Not Avialable"}</p>
              <p><strong>Schedule Date:</strong> {task.scheduleDate || "N/A"}</p>
              <p><strong>Attachment:</strong> {task.attachmentName || "None"}</p>
            </div>

            <div className="checkboxes">
              <strong>Track:</strong>
              <ul>
                {Object.entries(task.checkboxes).map(([key, value]) => (
                  <li key={key}>
                    {key.replace(/([A-Z])/g, " $1")} - {value ? "Yes" : "No"}
                  </li>
                ))}
              </ul>
            </div>

            <div className="activity-section">
              <h4>Activities ({task.activityData?.length || 0})</h4>
              {task.activityData?.length > 0 ? (
                task.activityData.map((activity, aIndex) => (
                  <div key={aIndex} className="activity-box">
                    <p><strong>Name:</strong> {activity.activityName}</p>
                    <p><strong>Assigned User:</strong> {activity.assignUser}</p>
                    <p><strong>Schedule Date:</strong> {activity.scheduleDate || "N/A"}</p>
                    <p><strong>Track:</strong></p>
                    <ul>
                      {Object.entries(activity.checkboxes || {}).map(([key, val]) => (
                        <li key={key}>
                          {key.replace(/([A-Z])/g, " $1")} - {val ? "Yes" : "No"}
                        </li>
                      ))}
                    </ul>
                    {activity.items?.length > 0 ? (
                      <ul className="checklist">
                        {activity.items.map((item, i) => (
                          <li key={i}> {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No checklist</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No activity data</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedTasks;
