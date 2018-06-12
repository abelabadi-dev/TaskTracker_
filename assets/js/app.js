window.addEventListener('load', function () {
    TaskApp.init();
});

var TaskApp = {
    tasks: [
            {"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
            {"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
            {"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
            {"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
            {"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
            {"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
            {"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
    ],
    init:function () {
        this.tasksTable = document.getElementById('tasksTable');
        this.taskNameInput = document.getElementById('taskName');
        this.taskDateInput = document.getElementById('taskDate');
        this.assignedToInput = document.getElementById('assignedTo');
        this.submitButton = document.getElementById('submitTask');
        this.populateTasks();
        this.submitListener();
    },
    populateTasks: function() {
        for(var i = 0; i < this.tasks.length; i++) {
            var taskItemEl = this.createRow(this.tasks[i]);
            this.tasksTable.appendChild(taskItemEl);
        }
    },
    submitListener:function () {
        this.submitButton.addEventListener('click',function (event) {
            event.preventDefault();
            var newTask = this.getNewTask();

            if(this.validateInput(newTask)) {
                this.taskNameInput.style['box-shadow'] = 'none';
                this.assignedToInput.style['box-shadow'] = 'none';
                this.addTask(newTask);
            }
        }.bind(this));
    },
    getNewTask: function() {
        var newTask = {};
        newTask.name = this.taskNameInput.value;
        newTask.date = this.dateFormat(this.taskDateInput.value);
        newTask.assigned = this.assignedToInput.value;
        return newTask;
    },
    addTask: function (newTask) {
        this.tasks.unshift(newTask);
        this.appendToDOM(newTask);
    },
    appendToDOM: function (newTask) {
            var taskItemEl = this.createRow(newTask);
            var firstChild = tasksTable.firstElementChild;
            this.tasksTable.insertBefore(taskItemEl, firstChild);

            this.taskNameInput.value = '';
            this.taskDateInput.value = '';
            this.assignedToInput.value = '';
    },
    createRow: function (task) {
        var  columns = '<td>' + task.name + '</td>' + '<td>' + task.date + '</td>' + '<td>' + task.assigned + '</td>';
        var taskRow = document.createElement('tr');
        taskRow.setAttribute('tabindex','0');
        taskRow.innerHTML = columns;
        return taskRow;
    },
    dateFormat:function (date) {
        var taskDate;
        isNaN(Date.parse(date)) ? taskDate =  new Date() :  taskDate = new Date(date);

        var mm = taskDate.getMonth() + 1;
        mm = (mm < 10) ? '0'+ mm : mm;
        var dd =  taskDate.getDate(); 
        dd = (dd <10 ) ? '0' + dd : dd;


        return( mm + '/' +  dd + '/' +  taskDate.getFullYear());
    },
    validateInput:function(newTask){
        var valid = true;
        if (!newTask.name) {
            this.taskNameInput.style['box-shadow'] = "0 0 3px red";
            valid = false;
        }
        if (!newTask.assigned) {
            this.assignedToInput.style['box-shadow'] = "0 0 3px red";
            valid = false;
        }

        return valid;
    }
}