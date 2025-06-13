let userform = document.getElementById("userform");
const retrieveEntries = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    return entries;
}
let userentries = retrieveEntries();
const displayentries = () => {
    const entries = retrieveEntries();
    const tableentries = entries.map((entry) => {
        const namecell  = "<td>"+entry.name+"</td>";
        const emailcell = "<td>"+entry.email+"</td>";
        const passwordcell = "<td>"+entry.password+"</td>";
        const dobcell = "<td>"+entry.dob+"</td>";
        const accpttermscell = "<td>"+entry.accptterms+"</td>";

        const row = "<tr>"+namecell+emailcell+passwordcell+dobcell+accpttermscell+"</tr>";
        return row;
    }).join("\n");

    const table = `<table><tr><th>Name</th><th>Email</th><th>Password</th><th>dob</th><th>Accepted terms?</th></tr>${tableentries}</table>`;
    document.getElementById("entries").innerHTML = table;
    
}
const dobInput = document.getElementById('dob');
const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

const toDateInputValue = (date) => date.toISOString().split('T')[0];

dobInput.max = toDateInputValue(maxDate);
dobInput.min = toDateInputValue(minDate);
const saveUserform = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accptterms = document.getElementById("terms").checked;
    //Validating age and email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    const age = today.getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
        alert("You must be at least 18 years old to register.");
        return; 
    }
    if (age > 55) {
        alert("You must be under 55 years old to register.");
        return;
    }
    const entry = {
        name,
        email,
        password,
        dob,
        accptterms
    }
    userentries.push(entry);
    localStorage.setItem("entries", JSON.stringify(userentries));
    displayentries();
    userform.reset();
}
displayentries();
