import React from "react";
function ContactItem({ icon, text, title }) {
    const Icon = icon;
    return (
        <div className="ContactItem">
            <Icon />
            <div className="right-items">
                <h6>{title}</h6>
                <p>{text}</p>
            </div>
        </div>
    );
}
export default ContactItem;
