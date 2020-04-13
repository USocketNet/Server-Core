
## USocketNet - WordPress Plugin

### About the Project

FIXING:
- [ON ACTIVATE PLUGIN] The plugin generated 24 characters of unexpected output during activation. If you notice “headers already sent” messages, problems with syndication feeds or other issues, try deactivating or removing this plugin.

## REST API LIST

### Authentication

CLIENT REQUEST:
- METHOD: POST
- URL: wp_url + /wp-json/usocketnet/v1/auth
- TYPE: x-www-form-urlencoded
- PARAM: UN->Username/Email, PW:->Password

SERVER RESPONSE:
- {"code": "unknown_request", "message": "Please contact your administrator.", "data", null} - Not set Request Type or Params.
- {"code": "empty_username", "message": "<strong>ERROR</strong>: The username field is empty.", "data", null} - Username or Email field is currently empty.
- {"code": "empty_password", "message": "<strong>ERROR</strong>: The password field is empty.", "data", null} - Password field is currently empty.
- {"code": "invalid_username", "message": "Unknown username. Check again or try your email address.", "data", null} - Password field is currently empty.
- {"code": "incorrect_password", "message": "<strong>ERROR</strong>: The password you entered for the username <strong>test</strong> is incorrect. <a href='http://localhost/wordpress/wp-login.php?action=lostpassword\'>Lost your password?</a>", "data", null} - Password field is currently empty.
- {"code": "auth_success", "message": "<strong>Success</strong>: Welcome to USocketNet Rest Api.", "data", "See More Below"} - Password field is currently empty.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BytesCrafter). 

## Authors

* **Caezar V. De Castro II** - *Initial work* - [GitLab](https://gitlab.com/BytesCrafter)

See also the list of [contributors](https://github.com/BytesCrafter) who participated in this project.

## License

This project is licensed under the GNU GPL License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Bytes Crafter
* Copyright 2020