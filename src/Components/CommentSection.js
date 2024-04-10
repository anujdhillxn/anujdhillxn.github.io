import { useState } from "react";
import { API_URL, LOADED } from "../config/api";
import axios from "axios";
export default function CommentSection({ commentList, apiCallStatus }) {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const postComment = async () => {
        try {
            const resp = await axios.post(API_URL + "comment", {
                author,
                content,
            });
            alert(resp.data.message);
        } catch (e) {
            alert(e.message);
        }
    };

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
                    <button onClick={postComment} className="btn">
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
