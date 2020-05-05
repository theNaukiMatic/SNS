import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props){
    return(
        <div className="footer mt-5">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link className="text-white" to='/home'>Home</Link></li>
                            <li><Link className="text-white" to='/notice_board'>Notice Board</Link></li>
                            <li><Link className="text-white" to='/groups'>Groups</Link></li>
                            <li><Link className="text-white" to='/profile'>Your Profile</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>SNS developed By:</h5>
                        <ul className="list-unstyled">
                            <li className="text-white">Naukesh Goyal</li>
                            <li className="text-white">Ishan Agrawal</li>
                            <li className="text-white">Manisha Kumari</li>
                            <li className="text-white">Jaya Meena</li>
                        </ul>
                    </div>
                    
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;