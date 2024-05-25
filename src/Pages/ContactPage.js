import React from "react";
import ContactItem from "../Components/ContactItem";
import Title from "../Components/Title";
import CommentSection from "../Components/CommentSection";
import { info } from "../config/info";
import { IconEmail, IconPhone } from "../img/icons";
const ContactPage = ({ apiCallStatus, commentList }) => {
    return (
        <div>
            <div className="title">
                <Title title={"Contact"} span={"Contact"} />
            </div>
            <div className="ContactPage">
                {/* <ContactItem
                    icon={IconPhone}
                    text={info.phoneNumber}
                    text2={""}
                    title={"Phone"}
                /> */}
                <ContactItem
                    icon={IconEmail}
                    text={info.email}
                    title={"Email"}
                />
            </div>
            <div className="separator-text">
                <h2>Or Write Anonymously</h2>
            </div>
            <CommentSection
                apiCallStatus={apiCallStatus}
                commentList={commentList}
            />
            <div style={{ marginBottom: "10rem" }} className="icons">
                {info.links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <a
                            href={link.url}
                            target="_blank"
                            className="icon-holder"
                            rel="noreferrer"
                        >
                            <Icon />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
export default ContactPage;
