$(function() {



    $("#fileInput").on("change", function() {
        var item = $('#fileInput').get(0).files[0];
        console.log(item);
        var fileExtension = item.name.split('.').pop();

        if (fileExtension === "json") {

            reader = new FileReader();

            reader.onload = function(e) {
                var dataString = reader.result;


                var data = JSON.parse(dataString);
                appendData(data) // DOM appending function goes here

                console.log(data.totalHours);
            }

            reader.readAsText(item);


        } else {
            console.log("Not a JSON file");
        }

    });




    //__________________________________________________________BEGIN DOM Appending

    function appendData(data) {

        $("input[name='full_name']").val(data.fullName);
        $("input[name='address']").val(data.address);
        $("input[name='pay_pal_email']").val(data.payPalEmail);
        $("input[name='start_date']").val(data.startDate);
        $("input[name='end_date']").val(data.endDate);
        $(".quantity-total").val(data.totalHours);
        $(".totals-total").val(data.totalPayment);

    }









    //___________________________________________________________END DOM Appending

})