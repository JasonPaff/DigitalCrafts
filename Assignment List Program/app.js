let assignmentTextBox = document.getElementById("assignmentTextBox");
let addButton = document.getElementById("addButton");
let pendingAssignmentList = document.getElementById("pendingAssignmentList");
let completedAssignmentList = document.getElementById(
  "completedAssignmentList"
);

assignmentTextBox.focus();

addButton.addEventListener("click", AddNewAssignment);

function RemoveFromPendingAssignmentsList() {
  let div = this.parentElement;
  pendingAssignmentList.removeChild(document.getElementById(div.id));
}
function RemoveFromCompletedAssignmentsList() {
  completedAssignmentList.removeChild(document.getElementById(this.id));
}

function MoveToCompletedAssignmentsList() {
  let div = document.getElementById(this.parentElement.id);

  let button = div.getElementById("button");
  button.addEventListener("click", RemoveFromCompletedAssignmentsList);

  let checkbox = div.getElementById("toggle");
  checkbox.addEventListener("click", MoveToPendingAssignmentsList);

  document.getElementById("completedAssignmentList").appendChild(div);
}

function MoveToPendingAssignmentsList() {
  let div = document.getElementById(this.id);

  document.getElementById("completedAssignmentList").appendChild(div);

  let button = div.getElementById(div.id);
  button.addEventListener("click", RemoveFromPendingAssignmentsList);

  let checkbox = div.getElementById("toggle");
  checkbox.addEventListener("click", MoveToCompletedAssignmentsList);
}

function AddNewAssignment() {
  let assignmentText = assignmentTextBox.value;

  if (assignmentText.trim() == "") return;

  // create new assignment html element
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "toggle";
  checkbox.addEventListener("click", MoveToCompletedAssignmentsList);

  let label = document.createElement("label");
  label.innerHTML = assignmentText;

  let button = document.createElement("button");
  button.innerHTML = "remove";
  button.id = "button";
  button.addEventListener("click", RemoveFromPendingAssignmentsList);

  // create div to hold new assignment
  let div = document.createElement("div");
  div.id = assignmentText;
  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(button);
  pendingAssignmentList.appendChild(div);

  // reset assignment text box and give it focus
  assignmentTextBox.value = "";
  assignmentTextBox.focus();
}
