$(function(){
    var $employees = $('#employees');
    var $UserId = $('#id');
    var $EmployeeName = $('#name');
    var $Age = $('#age');
    var $Salary = $('#salary');

    var employeeTemplate = "" +
   
    function addEmployee(employee){
        $employees.append(Mustache.render(employeeTemplate, employee));
    }

    //Using the Get Method to Read data from the backend
    $.ajax({
        type: 'GET',
        url: '/api/employees',
        success: function(employees){
            $.each(employees, function(i, employee){
                //$employees.append('<li>UserId:' + employee.UserId + ', EmployeeName: '+ employee.name +', Salary:' + employee.age +', Age:' + employee.salary +'</li>');
                addEmployee(employee);
            });
        },
        error: function(){
            alert('error loading employees');
        }
        
    });

    $('#add').on('click', function(){
        var employee = {
            id: $UserId.val(),
            name: $EmployeeName.val(),
            age = $age.val(),
            salary = $Salary.val()
        };
//Using Post to Create/add new employee
        $.ajax({
            type: 'POST',
            url: '/api/employees',
            data: employee,
            success: function(newEmployee){
                //$employees.append('<li>UserId:' + newEmployee.UserId + ', EmployeeName: '+ newEmployee.name +', Salary:' + newEmployee.age +', Age:' + newEmployee.salary +'</li>');
                addEmployee(newEmployee);
            },
            error: function(){
                alert('error saving employee');
            }
        });
    });

    //Using Delete method to Delete employee
    $employees.delegate('.remove', 'click', function(){
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: '/api/orders/' + $(this).attr('data-id'),
            success: function(){
                $li.remove();
            }
        });
    });
//Updating an employee(edit, save and cancel)
    $employees.delegate('.editEmployee', 'click', function(){
        var $li = $(this).closest('li');
        $li.find('input.id').val($li.find('span.id').html());
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.age').val($li.find('span.age').html());
        $li.find('input.salary').val($li.find('span.salary').html());
        $li.addClass('edit');
    });

    $employees.delegate('.cancelEdit', 'click', function(){
        $(this).closest('li').removeClass('edit');
    });

    $employees.delegate('.saveEdit', 'click', function(){
        var $li = $(this).closest('li');
        var employee = {
            id: $li.find('input.name').val(),
            name: $li.find('input.name').val(),
            age: $li.find('input.name').val(),
            salary: $li.find('input.name').val()
        };

        $.ajax({
            type: 'PUT',
            url:'/api/orders/' + $li.attr('data-id'),
            data: employee,
            success: function(newEmployee){
                $li.find('span.id').html(employee.id);
                $li.find('span.name').html(employee.name);
                $li.find('span.age').html(employee.age);
                $li.find('span.salary').html(employee.salary);
                $li.removeClass('edit');
            },
            error: function(){
                alert('error updating employee')
            }
        });
    });

});