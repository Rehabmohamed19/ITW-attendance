
model = {
    items: [
        {
            fname: "Slappy the frog",
        },
        {
            fname: "Lilly the Lizard",
        },
        {
            fname: "Paulrus the Walrus",
        },
        {
            fname: "Gregory the Goat",
        },
        {
            fname: "Adam the Anaconda",
        },
    ]
}

view = {

    checkAttendance: function () {

        if (!localStorage.attendance) {
            console.log('Creating attendance records...');
            function getRandom() {
                return (Math.random() >= 0.5);
            }



            var nameColumns = $('tbody .name-col'), attendance = {};

            model.items.forEach(item => {
                let name = item.fname;

                // var name = this.innerText;
                attendance[name] = [];

                for (var i = 0; i <= 11; i++) {
                    attendance[name].push(getRandom());
                }
            });

            localStorage.attendance = JSON.stringify(attendance);
        }
    },

    getName: function () {
        // this.checkAttendance();
        const names = document.getElementsByClassName("name-col");
        for (let i = 0; i < names.length; i++) {
            names[i].innerText = model.items[i].fname;
        }

    },

    render: function () {

        // this.checkAttendance();
        this.getName();

        var attendance = JSON.parse(localStorage.attendance),
            $allMissed = $('tbody .missed-col'),
            $allCheckboxes = $('tbody input');

        // Count a student's missed days
        function countMissing() {
            $allMissed.each(function () {
                var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;

                dayChecks.each(function () {
                    if (!$(this).prop('checked')) {
                        numMissed++;
                    }
                });

                $(this).text(numMissed);
            });
        }


        // Check boxes, based on attendace records
        $.each(attendance, function (name, days) {
            var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                dayChecks = $(studentRow).children('.attend-col').children('input');

            dayChecks.each(function (i) {
                $(this).prop('checked', days[i]);
            });
        });

        // When a checkbox is clicked, update localStorage
        $allCheckboxes.on('click', function () {
            var studentRows = $('tbody .student'),
                newAttendance = {};

            studentRows.each(function () {
                var name = $(this).children('.name-col').text(),
                    $allCheckboxes = $(this).children('td').children('input');

                newAttendance[name] = [];

                $allCheckboxes.each(function () {
                    newAttendance[name].push($(this).prop('checked'));
                });
            });

            countMissing();
            localStorage.attendance = JSON.stringify(newAttendance);
        });

        countMissing();
    },

}

controller = {
    init: function () {
        view.render();
        this.checkAttendance();
    },
    
}


controller.init()