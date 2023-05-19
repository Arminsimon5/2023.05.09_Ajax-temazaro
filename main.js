const base_url = "https://retoolapi.dev/Gkf3Dm/customers";

$(function () {
    listCustomer();
    $("#save").click(function () {
        modifyCustomer($("#customerId").val());

    });


    $("#customer-form").submit(function (e) {
        e.preventDefault();
        const name = $("#name_input").val();
        const email = $("#email_input").val();
        const validateEmail = (email) => {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        const address = $("#place_input").val();
        const customer = {
            Name: name,
            Email: email,
            Address: address
        }
        if ($("#name_input").val().length > 5) {
            if (validateEmail(email)) {
                $.post(base_url, customer,
                    function (data, textStatus, jqXHR) {
                        if (textStatus === "success") {
                            torol();
                            listCustomer();
                        }
                    },
                    "json"
                );
            }
            else {
                alert("Please valid email address.")
            }
        }
        else {
            alert("Please lenghten name to 6 characters or more.")
        }

    });
});

function torol() {
    $("#name_input").val("");
    $("#email_input").val("");
    $("#place_input").val("");
}

function listCustomer() {
    $.get(base_url, function (data, textStatus) {
        let html = "";
        data.forEach(customer => {
            html += `<tr>
                <td>${customer.id}</td>
                <td>${customer.Name}</td>
                <td>${customer.Email}</td>
                <td>${customer.Address}</td>
                <td>
                <i onclick="readCustomer(${customer.id})" class="fa fa-edit"></i>
                </td>
                <td>
                <i onclick="deleteCustomer(${customer.id})" class="fa fa-remove"></i>
                </td>
            </tr>`;
        });
        $("#customer-table").html(html);
    },
        "json");
}

function deleteCustomer(customerId) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${customerId}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listCustomer();
            }
        }
    });
}

function readCustomer(customerId) {
    $.get(base_url + "/" + customerId,
        function (data, textStatus) {
            $("#name_input").val(data.Name);
            $("#email_input").val(data.Email);
            $("#place_input").val(data.Address);
            $("#customerId").val(data.id)
        },
        "json")
    document.getElementById("save").hidden = false;
}

function modifyCustomer(customerId) {
    const name = $("#name_input").val();
    const email = $("#email_input").val();
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const address = $("#place_input").val();
    const customer = {
        Name: name,
        Email: email,
        Address: address
    }
    if ($("#name_input").val().length > 5) {
        if (validateEmail(email)) {
            $.ajax({

                type: "PUT",
                url: `${base_url}/${customerId}`,
                data: customer,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    if (textStatus === "success") {
                        listCustomer();
                    }
                }
            })
            document.getElementById("save").hidden = true;
            torol();
            listPeople();
        }
        else {
            alert("Please valid email address.")
        }
    }
    else {
        alert("Please lenghten name to 6 characters or more.")
    }

}
