import React, { useState, useEffect } from "react";
import "./NewActivity.css";
import { FaTrashAlt } from "react-icons/fa";

const NewActivity = ({ onSave, onClose, initialData }) => {
  const [assignUser, setAssignUser] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [activityName, setActivityName] = useState("");
  const [items, setItems] = useState([""]);
  const [errorIndices, setErrorIndices] = useState([]);

  useEffect(() => {
    if (initialData) {
      setAssignUser(initialData.assignUser || "");
      setSchedule(initialData.schedule || false);
      setScheduleDate(initialData.scheduleDate || "");
      setActivityName(initialData.activityName || "");
      setItems(initialData.items || [""]);
    }
  }, [initialData]);

  const addItem = () => {
    setItems((prev) => [...prev, ""]);
    setErrorIndices([]);
  };

  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
    if (value.trim()) {
      setErrorIndices((prev) => prev.filter((i) => i !== index));
    }
  };

  const deleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setErrorIndices([]);
  };

  const validateChecklist = () => {
    const empty = items
      .map((item, i) => (item.trim() === "" ? i : null))
      .filter((i) => i !== null);
    setErrorIndices(empty);
  };

  const handleClick = () => {
    validateChecklist();
    if (items.some((item) => item.trim() === "")) return;

    const newData = {
      assignUser,
      schedule,
      scheduleDate,
      activityName,
      items,
    };

    onSave?.(newData);
    onClose?.();

    setAssignUser("");
    setSchedule(false);
    setScheduleDate("");
    setActivityName("");
    setItems([""]);
  };

  return (
    <div className="container3">
      <div className="header">
        <h3>New Activity</h3>
        <button onClick={onClose} className="close-button1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>
      <div className="container9">
        <div className="container4">
          <div className=" overall">
            <div className="form-group">
              <label htmlFor="assign-user">Assign User</label>
              <select
                id="assign-user"
                value={assignUser}
                onChange={(e) => setAssignUser(e.target.value)}
              >
                <option value="">Not Applicable</option>
                <option>Sriman Narayanan</option>
                <option>Another User</option>
              </select>
            </div>

            <div className="checkbox-container1">
              <label>
                Schedule
                <input
                  type="checkbox"
                  checked={schedule}
                  onChange={(e) => setSchedule(e.target.checked)}
                />
              </label>
            </div>

            <div className="schedule-date">
              <label>Date</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
          </div>

          <div className="activity-name">
            <label htmlFor="activity-write">Activity</label>
            <textarea
              id="activity-write"
              placeholder="Type activity here"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
          </div>

          <div className="checklist-container">
            <div className="checklist-header">
              <span>Add Checklist</span>
              <button className="add-btn" onClick={addItem}>
                +
              </button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="checklist-item">
                <span
                  className={`bullet ${
                    errorIndices.includes(index) ? "bullet-error" : ""
                  }`}
                >
                  &#8226;
                </span>
                <textarea
                  className={errorIndices.includes(index) ? "input-error" : ""}
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  onBlur={validateChecklist}
                />
                <button
                  className="delete-btn"
                  onClick={() => deleteItem(index)}
                  aria-label="Delete"
                >
                  <FaTrashAlt />
                </button>
                {errorIndices.includes(index) && (
                  <div className="inline-error">Please Fill The Data.</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="save-button">
        <button onClick={handleClick}>Save</button>
      </div>
    </div>
  );
};

export default NewActivity;
