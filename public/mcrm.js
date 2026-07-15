function init() {
    console.log("Initializing...");
    // TODO: implement logic
}

function dlg_new_consumer_reset() {
    console.log("Resetting new consumer dialog...");
    document.getElementById("consumer_title").selectedIndex = 0;
    document.getElementById("company_name").value = "";
    document.getElementById("company_name").disabled = true;
    document.getElementById("consumer_first_name").value = "";
    document.getElementById("consumer_last_name").value = "";
    document.getElementById("consumer_mail_address").value = "";
    document.getElementById("consumer_phone_home").value = "";
    document.getElementById("consumer_phone_mobile").valiue = "";
    document.getElementById("consumer_addr_street").value = "";
    document.getElementById("consumer_addr_house_no").value = "";
    document.getElementById("consumer_addr_zip").value = "";
    document.getElementById("consumer_addr_country").selectedIndex = 0;
    document.getElementById("chk_never_contact").checked = false;
    document.getElementById("chk_nps_opt_out").checked = false;
    document.getElementById("consumer_type_B2C").checked = true;
    document.getElementById("consumer_type_B2B").checked = false;
}

function dlg_new_consumer_close() {
    console.log("Closing new consumer dialog...");
    dlg_new_consumer_reset();
    window.dlg_new_consumer.close();
}

function nav_test() {
    // TODO: implement
    document.getElementById("dlg_test_content").textContent = "Test";
    window.dlg_test2.showModal();
}