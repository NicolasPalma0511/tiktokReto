import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaComment, FaShare, FaFlag, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Video = ({ videoId, userId, videoUrl }) => {
  const videoRef = useRef(null);
  const startTimeRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  useEffect(() => {
    const handlePlay = () => {
      startTimeRef.current = Date.now();
    };

     const fixServerUrl = (url) => {
      return url.replace('-80', '-3000');
    };
    
    
    const handlePause = () => {
      const endTime = Date.now();
      if (startTimeRef.current !== null) {
        const timeSpent = (endTime - startTimeRef.current) / 1000;
    
        const currentUrl = window.location.origin;
        const modifiedUrl = fixServerUrl(currentUrl);
    
        axios.post(`${modifiedUrl}/api/watchtime`, {
          userId,
          videoId,
          timeSpent,
        }).catch((error) => console.error('Error el tiempo de visualización:', error));
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [userId, videoId]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      if (editCommentId !== null) {
        setComments(comments.map(comment => 
          comment.id === editCommentId ? { ...comment, text: newComment.trim() } : comment
        ));
        setEditCommentId(null);
      } else if (replyToCommentId !== null) {
        setComments(comments.map(comment => 
          comment.id === replyToCommentId 
          ? { ...comment, replies: [...(comment.replies || []), { id: Date.now(), text: newComment.trim(), userId }] }
          : comment
        ));
        setReplyToCommentId(null);
      } else {
        const newCommentData = {
          id: Date.now(),
          userId,
          videoId,
          text: newComment.trim(),
          replies: [],
        };
        setComments([...comments, newCommentData]);
      }
      setNewComment('');
    }
  };

  const handleEditComment = (commentId) => {
    const comment = comments.find(comment => comment.id === commentId);
    setNewComment(comment.text);
    setEditCommentId(commentId);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleReplyToComment = (commentId) => {
    setReplyToCommentId(commentId);
    setNewComment('');
  };

  return (
    <div className="video-container">
      <video ref={videoRef} controls width="300" height="500">
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="video-actions">
        <FaHeart 
          className="action-button" 
          style={{ color: liked ? 'red' : 'white' }} 
          onClick={handleLike} 
        />
        <FaComment className="action-button" onClick={toggleModal} />
        <FaShare className="action-button" />
        <FaFlag className="action-button" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Comentarios"
        style={{
          content: {
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            width: '30%',
            padding: '20px',
            overflow: 'auto',
            border: 'none',
            borderRadius: '0',
            background: '#1c1c1e',
            color: 'white',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <h2>Comentarios</h2>
        <div className="comments-list">
          {comments.slice(0, 20).map((comment) => (
            <div key={comment.id} className="comment-box">
              <p>{comment.text}</p>
              <div className="comment-actions">
                <FaEdit className="comment-action-button" onClick={() => handleEditComment(comment.id)} />
                <FaTrash className="comment-action-button" onClick={() => handleDeleteComment(comment.id)} />
                <button className="reply-button" onClick={() => handleReplyToComment(comment.id)}>Responder</button>
              </div>
              {comment.replies && comment.replies.map((reply) => (
                <div key={reply.id} className="reply-box">
                  <p>{reply.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Agregar comentario"
            style={{ background: '#333', color: 'white', border: 'none', padding: '10px', width: '100%' }}
          />
          <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', background: '#333', color: 'white', border: 'none' }}>
            {editCommentId !== null ? 'Editar' : replyToCommentId !== null ? 'Responder' : 'Enviar'}
          </button>
        </form>
        <button onClick={toggleModal} style={{ marginTop: '10px', padding: '10px 20px', background: '#333', color: 'white', border: 'none' }}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Video;
