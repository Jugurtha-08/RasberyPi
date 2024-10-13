$(document).ready(() => {
    const id = setInterval(() => updateState(), 500);
    function updateState() {
        $.ajax({
            method: 'get',
            url: '/select/',
            success: (result) => {
                for (var count = 0; count < result.length; count++) {
                    if (result[count].statut == "on") {
                        $('#arm').text('ARMED');
                        $('#arm').css('color', '#3CCF4E');
                        result[count].zone1 == "on" ? $('#z1').css('background-color', '#3CCF4E') : $('#z1').css('background-color', 'red');
                        result[count].zone2 == "on" ? $('#z2').css('background-color', '#3CCF4E') : $('#z2').css('background-color', 'red');
                        result[count].zone3 == "on" ? $('#z3').css('background-color', '#3CCF4E') : $('#z3').css('background-color', 'red');
                        result[count].zone4 == "on" ? $('#z4').css('background-color', '#3CCF4E') : $('#z4').css('background-color', 'red');
                    } else if (result[count].statut == "off") {
                        $('#arm').text('UNARMED');
                        $('#arm').css('color', 'black');
                        $('#z1,#z2,#z3,#z4').css('background-color', 'gray');
                    }
                }
            },
            error: (err) => {
                alert(err)
            }
        });
        
    };
    $('#z1').click(function () {
        let value;
        var statut = $('#arm').text();
        if (statut == 'ARMED') {
            var color = $('#z1').css('background-color');
            if (color == 'rgb(255, 0, 0)' || color == 'rgb(128, 128, 128)') {
                $('#z1').css('background-color', '#3CCF4E');
                value = 'on';
            } else if (color == 'rgb(60, 207, 78)') {
                $('#z1').css('background-color', 'red');
                value = 'off';
            }
            $.ajax({
                url: '/updateZone1/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ zone1: value })
            });
        } else if (statut == 'UNARMED'){
            $('#z1').css('background-color', 'gray');
        }
    });

    $('#z2').click(function () {
        let value;
        var statut = $('#arm').text();
        if (statut == 'ARMED') {
            var color = $('#z2').css('background-color');
            if (color == 'rgb(255, 0, 0)' || color == 'rgb(128, 128, 128)') {
                $('#z2').css('background-color', '#3CCF4E');
                value = 'on';
            } else if (color == 'rgb(60, 207, 78)') {
                $('#z2').css('background-color', 'red');
                value = 'off';
            }
            $.ajax({
                url: '/updateZone2/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ zone2: value })
            });
        } else if (statut == 'UNARMED'){
            $('#z2').css('background-color', 'gray');
        }
    });

    $('#z3').click(function () {
        let value;
        var statut = $('#arm').text();
        if (statut == 'ARMED') {
            var color = $('#z3').css('background-color');
            if (color == 'rgb(255, 0, 0)' || color == 'rgb(128, 128, 128)') {
                $('#z3').css('background-color', '#3CCF4E');
                value = 'on';
            } else if (color == 'rgb(60, 207, 78)') {
                $('#z3').css('background-color', 'red');
                value = 'off';
            }
            $.ajax({
                url: '/updateZone3/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ zone3: value })
            });
        } else if (statut == 'UNARMED'){
            $('#z3').css('background-color', 'gray');
        }
    });

    $('#z4').click(function () {
        let value;
        var statut = $('#arm').text();
        if (statut == 'ARMED') {
            var color = $('#z4').css('background-color');
            if (color == 'rgb(255, 0, 0)' || color == 'rgb(128, 128, 128)') {
                $('#z4').css('background-color', '#3CCF4E');
                value = 'on';
            } else if (color == 'rgb(60, 207, 78)') {
                $('#z4').css('background-color', 'red');
                value = 'off';
            }
            $.ajax({
                url: '/updateZone4/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ zone4: value })
            });
        } else if (statut == 'UNARMED'){
            $('#z4').css('background-color', 'gray');
        }
    });

    $('#arm').click(() => {
        var text = $('#arm').text();
        let value;
        if (text == 'ARMED') {
            $('#arm').text('UNARMED');
            $('#arm').css('color', 'black');
            $('#z1,#z2,#z3,#z4').css('background-color', 'gray');
            value = 'off';
            console.log(text+"  "+value);
            $.ajax({
                url: '/arm/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ statut: value }),
                success: (result) => {
                  updateState();
                }
              });              
        } else {
            $('#arm').text('ARMED');
            $('#arm').css('color', '#3CCF4E');
            value = 'on';
            console.log(text+"  "+value);
            $.ajax({
                url: '/arm/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ statut: value }),
                success: (result) => {
                  updateState();
                }
              });              
        }
                  
    });
    $('#reset').click(() => {
        $.ajax({
            url: '/reset/',
            method: 'POST'
        });
    });
});