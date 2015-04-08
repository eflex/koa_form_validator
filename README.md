
**usage:**
```
var formValidator = require("koa_form_validator")
app.use(formValidator());
```

*this will create*
```
 this.validateForm(rule)
```

*form definition*
```
module.exports = {
  name: {
    optional: true,
    rules: [{
      rule: 'isLength',
      args: [3, 50],
      msg: "Name should be betwwn 3 and 50 characters"
    }]
  },
  email:{
          rules: [
            rule: 'isEmail',
            message: "Invalid email format"
          ]
        }
}

var rules = this.forms.auth.register
var form = this.validateForm(rules)

if(form.isValid()){
  ....
}else{
  form.errors()
}
```