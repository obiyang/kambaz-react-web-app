export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <div>
        <label htmlFor="wd-name">Assignment Name</label><br/>
        <input id="wd-name" value="A1 - ENV + HTML" style={{width: "200px"}} />
      </div>
      
      <div style={{marginTop: "20px"}}>
        <textarea
          id="wd-description"
          rows={8}
          cols={60}
          value="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the Lab assignments Link to the Kambas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
        />
      </div>

      <div style={{marginTop: "20px"}}>
        <label htmlFor="wd-points">Points</label>
        <input id="wd-points" type="text" value="100" style={{width: "60px", marginLeft: "10px"}} />
      </div>

      <div style={{marginTop: "20px"}}>
        <label htmlFor="wd-group">Assignment Group</label>
        <select id="wd-group" style={{marginLeft: "10px"}}>
          <option>ASSIGNMENTS</option>
        </select>
      </div>

      <div style={{marginTop: "20px"}}>
        <label htmlFor="wd-display-grade-as">Display Grade as</label>
        <select id="wd-display-grade-as" style={{marginLeft: "10px"}}>
          <option>Percentage</option>
        </select>
      </div>

      <div style={{marginTop: "20px"}}>
        <label htmlFor="wd-submission-type">Submission Type</label>
        <select id="wd-submission-type" style={{marginLeft: "10px"}}>
          <option>Online</option>
        </select>
      </div>

      <div style={{marginTop: "20px"}}>
        <h3>Online Entry Options</h3>
        <div>
          <input type="checkbox" id="wd-text-entry" />
          <label htmlFor="wd-text-entry">Text Entry</label>
        </div>
        <div>
          <input type="checkbox" id="wd-website-url" />
          <label htmlFor="wd-website-url">Website URL</label>
        </div>
        <div>
          <input type="checkbox" id="wd-media-recordings" />
          <label htmlFor="wd-media-recordings">Media Recordings</label>
        </div>
        <div>
          <input type="checkbox" id="wd-student-annotation" />
          <label htmlFor="wd-student-annotation">Student Annotation</label>
        </div>
        <div>
          <input type="checkbox" id="wd-file-upload" />
          <label htmlFor="wd-file-upload">File Uploads</label>
        </div>
      </div>

      <div style={{marginTop: "20px"}}>
        <label htmlFor="wd-assign-to">Assign to</label><br/>
        <input id="wd-assign-to" type="text" value="Everyone" style={{width: "200px"}} />
      </div>

      <div style={{marginTop: "20px"}}>
        <label htmlFor="wd-due-date">Due</label><br/>
        <input id="wd-due-date" type="date" value="2024-05-13" />
      </div>

      <div style={{marginTop: "20px"}}>
        <div>
          <label htmlFor="wd-available-from">Available from</label>
          <input 
            id="wd-available-from" 
            type="date" 
            value="2024-05-06" 
            style={{marginLeft: "10px"}}
          />
        </div>
        <div style={{marginTop: "10px"}}>
          <label htmlFor="wd-available-until">Until</label>
          <input 
            id="wd-available-until" 
            type="date" 
            value="2024-05-20" 
            style={{marginLeft: "10px"}}
          />
        </div>
      </div>

      <div style={{marginTop: "20px", textAlign: "right"}}>
        <button>Cancel</button>
        <button style={{marginLeft: "10px"}}>Save</button>
      </div>
    </div>
  );
}
