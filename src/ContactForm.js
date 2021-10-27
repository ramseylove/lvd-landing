import React from 'react';

function ContactForm() {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted')
    }

    return (
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input type="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ContactForm;