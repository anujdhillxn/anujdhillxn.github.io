import { useState } from "react";
import { LOADED } from "../config/api";
export default function CommentSection({ commentList, apiCallStatus }) {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    return (
        <div className="comment-box">
            <div className="write-area">
                <div className="inputtext">
                    <textarea
                        type="text"
                        maxlength="200"
                        id="content"
                        name="content"
                        placeholder="Write comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <textarea
                        type="text"
                        maxlength="200"
                        id="author"
                        name="author"
                        placeholder="Write your name..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="submit-button">
                    <button onClick={() => {}} className="btn">
                        Send
                    </button>
                </div>
            </div>
            <div className="display-area">
                {apiCallStatus === LOADED
                    ? commentList.map((item) => {
                          return (
                              <div className="comment">
                                  <div className="comment-info">
                                      <span className="comment-author">
                                          {item.author}
                                      </span>
                                      <p>{item.dateAdded}</p>
                                  </div>
                                  <div className="comment-body">
                                      <p>{item.content}</p>
                                  </div>
                              </div>
                          );
                      })
                    : apiCallStatus}
            </div>
        </div>
    );
}
