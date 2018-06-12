describe('TaskAppTest',function () {
	var task;
	beforeEach(function () {
		setFixtures('<form class="task-form">'
			+'<input type="text" id="taskName" name="taskName" value="Get this Done.">'
					+'<input type="text" id="taskDate" name="taskDate" value="10/14/2016">'
					+'<input type="text" id="assignedTo" name="assignedTo" value="Abel">'
					+'<button id="submitTask">Submit</button>'
				+'</form><table class="table" id="tasksTable"></table>'
				+'');
		task ={
			name: 'Get this Done.',
            date: '10/14/2016',
            assigned: 'Abel'
		}
		TaskApp.init();
	});
	it('should initialize TaskApp',function () {
		spyOn(TaskApp,"init");
		TaskApp.init();
		expect(TaskApp.init).toHaveBeenCalled();
	});
	it('should listen to button click', function () {
        spyOnEvent('#submitTask', 'click');
        $('#submitTask').click();
        expect('click').toHaveBeenTriggeredOn('#submitTask');
    });
	it('should add new Task',function () {
        var tasks = TaskApp.tasks.length;
         $('#submitTask').click();
        expect(TaskApp.tasks.length).toEqual(tasks + 1);
	});
	it('should read task from form inputs', function () {
        var inputTask = TaskApp.getNewTask();
        expect(inputTask).toEqual(task);
    });
    it('should show all task lists in browser', function () {
        expect($('#tasksTable tr')).toHaveLength(TaskApp.tasks.length);
    });
    it('should create task row', function () {
        var tr = TaskApp.createRow(task);
        var columns = $(tr).children('td')
        expect(columns.length).toEqual(3);
        expect(columns[0].innerHTML).toBe('Get this Done.');
        expect(columns[1].innerHTML).toBe('10/14/2016');
        expect(columns[2].innerHTML).toBe('Abel');
    });
});