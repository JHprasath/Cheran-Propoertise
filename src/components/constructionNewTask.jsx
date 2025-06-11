import React, { useState, useRef,useEffect } from "react";
import "./constructionNewTask.css";
import { FaEdit, FaTrashAlt, FaChevronUp, FaList } from "react-icons/fa";
import NewActivity from "./NewActivity";
import { Link } from "react-router-dom";

const ConstructionNewTask = ({ data = [], setData }) => {
  const [checkedItems, setCheckedItems] = useState({
    trackMaterials: false,
    stagePayment: false,
    trackQty: true,
    trackLabour: false,
  });
  const [isScheduleOn, setIsScheduleOn] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showNewActivity, setShowNewActivity] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [openIndexes, setOpenIndexes] = useState({});

  const toggleSchedule = () => setIsScheduleOn((prev) => !prev);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setAttachment(null);
    setPreviewUrl(null);
  };

  const handleAddClick = () => {
    setEditItem(null);
    setEditIndex(null);
    setShowNewActivity(true);
  };

  const handleSave = (newItem) => {
    if (!newItem || typeof newItem !== "object" || !newItem.activityName) {
      console.warn("Invalid new item:", newItem);
      return;
    }

    if (setData) {
      setData((prevData) => {
        if (editIndex !== null) {
          const updated = [...prevData];
          updated[editIndex] = newItem;
          return updated;
        }
        return [...prevData, newItem];
      });
    }
    setShowNewActivity(false);
    setEditItem(null);
    setEditIndex(null);
  };

  const handleClose = () => {
    setShowNewActivity(false);
    setEditItem(null);
    setEditIndex(null);
  };

  const handleEdit = (item, index) => {
    setEditItem(item);
    setEditIndex(index);
    setShowNewActivity(true);
  };

  const toggleDropdown = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = (indexToDelete) => {
    if (!setData) return;
    const updated = data.filter((_, index) => index !== indexToDelete);
    setData(updated);
    const newOpenIndexes = { ...openIndexes };
    delete newOpenIndexes[indexToDelete];
    setOpenIndexes(newOpenIndexes);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleCreateTask = () => {
    const formData = {
      project: document.getElementById("project")?.value || "",
      site: document.getElementById("site")?.value || "",
      description: document.querySelector(".BoundaryWall")?.value || "",
      checkboxes: checkedItems,
      workCategory: document.querySelectorAll("select")[2]?.value || "",
      vendor: document.querySelectorAll("select")[3]?.value || "",
      unit: document.querySelectorAll("select")[4]?.value || "",
      qty: document.querySelector(".qty input")?.value || "",
      assignUser: document.querySelectorAll("select")[5]?.value || "",
      schedule: isScheduleOn,
      scheduleDate: document.querySelector('input[type="date"]')?.value || "",
      attachmentName: attachment?.name || "",
      activityData: data,
    };

    // Append to localStorage
    const existingTasks = JSON.parse(localStorage.getItem("constructionTasks")) || [];
    console.log(existingTasks)
    existingTasks.push(formData);
    localStorage.setItem("constructionTasks", JSON.stringify(existingTasks));

    alert('Construction new task is "SAVED SUCCESSFULLY"!');

    // Clear form
    document.getElementById("project").value = "";
    document.getElementById("site").value = "";
    document.querySelector(".BoundaryWall").value = "";
    document.querySelectorAll("select").forEach((select) => (select.value = ""));
    const qtyInput = document.querySelector(".qty input");
    if (qtyInput) qtyInput.value = "";
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) dateInput.value = "";
    setCheckedItems({
      trackMaterials: false,
      stagePayment: false,
      trackQty: true,
      trackLabour: false,
    });
    setAttachment(null);
    setIsScheduleOn(false);
    setData([]);
  };

  const containerRef = useRef(null);
const [showFloatingHeader, setShowFloatingHeader] = useState(false);

useEffect(() => {
  const container = containerRef.current;

  const handleScroll = () => {
    const scrollTop = container?.scrollTop || 0;
    setShowFloatingHeader(scrollTop > 50);
  };

  if (container) {
    container.addEventListener("scroll", handleScroll);
  }

  return () => {
    if (container) {
      container.removeEventListener("scroll", handleScroll);
    }
  };
}, []);


  return (
    <div className="container" style={{ position: "relative", zIndex: 1 }} ref={containerRef}>
      <div className="header">
        <h3>Construction new task</h3>
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
      </div>
            <div
  className="header2"
  style={{
    position: "relative",
    top: showFloatingHeader ? "10px" : "0px",
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "top 0.3s ease-in-out",
  }}
>
  <a href="/">Cheran Nagar / CN 038S</a>
</div>



      <div className="container0">
        <div className="container1">
          <div className="form-row">
            <div className="form-group custom-select-wrapper">
              <label htmlFor="project">Project</label>
              <select id="project">
                <option>General</option>
                <option>Housing</option>
                <option>Roadwork</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="site">Site</label>
              <select id="site">
                <option>General</option>
                <option>Site A</option>
                <option>Site B</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <textarea
              className="BoundaryWall"
              placeholder="Construction of Boundary Wall"
            />
          </div>

          <div className="checkbox-container">
            {["trackMaterials", "stagePayment", "trackQty", "trackLabour"].map(
              (key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    name={key}
                    checked={checkedItems[key]}
                    onChange={handleChange}
                  />
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
              )
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Work Category</label>
              <select>
                <option>Civil Work</option>
                <option>Engineering Work</option>
                <option>ABC Work</option>
              </select>
            </div>

            <div className="form-group">
              <label>Vendor</label>
              <select>
                <option>Contractor A</option>
                <option>Contractor B</option>
              </select>
            </div>
          </div>

          <div className="form-row user">
            <div className="unit-qty">
              <div className="form-group unit">
                <label>Unit</label>
                <select>
                  <option>Sq Ft</option>
                  <option>Meters</option>
                </select>
              </div>

              <div className="form-group qty">
                <label>Qty</label>
                <input type="text" placeholder="Qty" />
              </div>
            </div>

            <div className="form-group">
              <label>Assign User</label>
              <select>
                <option>Sonaimuthu N</option>
                <option>Other User</option>
              </select>
            </div>
          </div>

          <div className="schedule-date1">
            <div>
              <label>Schedule</label>
              <div
                className={`toggle-switch ${isScheduleOn ? "on" : ""}`}
                onClick={toggleSchedule}
              >
                <div className="slider"></div>
              </div>
            </div>
            <div>
              <label>Date</label>
              <input type="date" />
            </div>
          </div>

          <div className="attachment-section">
            <label>Attachments</label>
            <div className="attachment-preview">
              {previewUrl && (
                <div className="file-box">
                  <img src={previewUrl} alt="Preview" className="preview-img" />
                  <button className="remove-btn" onClick={handleRemove}>
                    Remove
                  </button>
                </div>
              )}
              <label htmlFor="file-upload" className="upload-circle">
                <span>+</span>
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="actitvity-container">
        <h3>Activity({data.length})</h3>
        <button className="go-to-new-activity" onClick={handleAddClick}>
          Add New +
        </button>

        {showNewActivity && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NewActivity
              onSave={handleSave}
              onClose={handleClose}
              initialData={editItem}
            />
          </div>
        )}
      </div>

      {Array.isArray(data) &&
        data.map((item, index) => {
          if (!item || !item.activityName) return null;
          return (
            <div className="activity-card" key={index}>
              <div className="card-header">
                <div>
                  <h3>{item.activityName}</h3>
                </div>
                <div className="icons">
                  <FaChevronUp
                    className={`icon ${openIndexes[index] ? "rotated" : ""}`}
                    onClick={() => toggleDropdown(index)}
                  />
                  <div className="falist">
                    {item.items?.length || 0} <FaList />
                  </div>
                  <FaEdit
                    className="icon edit"
                    onClick={() => handleEdit(item, index)}
                  />
                  <FaTrashAlt
                    className="icon delete"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>

              {openIndexes[index] && (
                <>
                  {item.items && item.items.length > 0 ? (
                    <ul className="task-list">
                      {item.items.map((checkItem, i) => (
                        <li key={i}>{checkItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ marginLeft: "13px" }}>No checklist</p>
                  )}
                  <div className="footer">
                    <span className="badge">{item.assignUser}</span>
                    <span className="badge light">{item.scheduleDate}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}

      <div className="create-task">
        <button
          onClick={() => {
            handleCreateTask();
            handleRemove();
          }}
        >
          Create task
        </button>
        <Link to="/savedTask">
          <button>Show Task</button>
        </Link>
      </div>
    </div>
  );
};

export default ConstructionNewTask;