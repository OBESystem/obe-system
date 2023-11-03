function Validation(values){
    let error = {};
    const email_pat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    if(values.name === "")
    {
        error.name = "Name should not be empty";
    }
    else
    {
        error.name = "";
    }

    if(values.dept === "")
    {
        error.dept = "Department should not be empty";
    }
    else
    {
        error.dept = "";
    }


    var str = JSON.stringify(values.phoneNumber);
    var len = str.length;
    len = len -2;
    if(values.phoneNumber === "")
    {
        error.phoneNumber = "phoneNumber should not be empty";
    }
    else if(len<11)
    {
        error.phoneNumber = "Format of the phone number didn't match.";
    }
    else
    {
        error.phoneNumber = "";
    }

    if(values.email === "")
    {
        error.email = "Email should not be empty";
    }
    else if(!email_pat.test(values.email))
    {
        error.email = "Email didn't match the format";
    }
    else
    {
        error.email = "";
    }

    if(values.designation === "")
    {
        error.designation = "Designation should not be empty";
    }
    else
    {
        error.designation = "";
    }

    str = JSON.stringify(values.password);
    var letters =0;
    var numbers =0;
    len = str.length;
    for(var i =0; i<len ;i++)
    {
        if(str[i]>='0' && str[i]<='9')
        {
            numbers++;
        }
        else if((str[i]>='a' && str[i]<='z') || (str[i]>='A' && str[i]<='Z'))
        {
            letters++;
        }
    }
    len = len -2;
    if(values.password === "")
    {
        error.password = "Password should not be empty";
    }
    else if(len<8)
    {
        error.password = "Password should contain at least 8 characters.";
    }
    else if(numbers === 0)
    {
        error.password = "Password must contain at least one digit";
    }
    else if(letters === 0)
    {
        error.password = "Password must contain at least alphabet";
    }
    else
    {
        error.password = "";
    }

    if(values.confirmPassword === "")
    {
        error.confirmPassword = "Enter the password again.";
    }
    else if(JSON.stringify(values.confirmPassword) !== JSON.stringify(values.password))
    {
        error.confirmPassword = "Password didn't match.";
    }
    else
    {
        error.confirmPassword = "";
    }
    return error; 
}

export default Validation;