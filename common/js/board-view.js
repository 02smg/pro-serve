document.addEventListener('DOMContentLoaded', () => {
    const commentBtn = document.querySelector('.comment-btn');
    const commentList = document.getElementById('comment-list');

    // 댓글 작성
    commentBtn.addEventListener('click', () => {
        const textarea = document.getElementById('comment-textarea');
        const text = textarea.value.trim();

        if (text) {
            const newComment = document.createElement('div');
            newComment.classList.add('commentItem');
            newComment.innerHTML = `
                <div class="commentItem-wrap">
                    <div class="comment-user">
                        <div class="user-thumb"><img src="./../common/images/userImg.jpg" alt=""></div>
                        <div class="user-info">
                            <span class="user-name">작성자</span>
                            <span class="user-date">9999.99.99</span>
                        </div>
                    </div>
                    <div class="comment-detail">
                        <p>${text}</p>
                    </div>
                    <button class="btn reply-btn">답글 달기</button>
                    <div class="reply-form">
                        <textarea placeholder="답글을 입력하세요."></textarea>
                        <button class="btn reply-submit">답글 달기</button>
                    </div>
                </div>
                <div class="reply-list"></div>
            `;
            commentList.appendChild(newComment);
            textarea.value = ''; // 텍스트 영역 비우기
        } else {
            alert('댓글 내용을 입력해 주세요.');
        }
    });

    // 댓글 목록 클릭 처리
    commentList.addEventListener('click', (event) => {
        if (event.target.classList.contains('reply-btn')) {
            const commentItem = event.target.closest('.commentItem');
            const replyForm = commentItem.querySelector('.reply-form');
            const replyBtn = commentItem.querySelector('.reply-btn');
            
            // 답글 폼 보이기
            replyForm.style.display = 'block';
            replyBtn.style.display = 'none';
        } else if (event.target.classList.contains('reply-submit')) {
            const replyForm = event.target.closest('.reply-form');
            const replyTextarea = replyForm.querySelector('textarea');
            const replyText = replyTextarea.value.trim();

            if (replyText) {
                const newReply = document.createElement('div');
                newReply.classList.add('replyItem');
                newReply.innerHTML = `
                    <div class="replyItem-wrap">
                        <div class="reply-user">
                            <div class="user-thumb"><img src="/common/images/userImg.png" alt=""></div>
                            <div class="user-info">
                                <span class="user-name">작성자</span>
                                <span class="user-date">9999.99.99</span>
                            </div>
                        </div>
                        <div class="reply-detail">
                            <p>${replyText}</p>
                        </div>
                    </div>
                `;
                // 댓글의 `.reply-list`를 찾기 위해 `.commentItem`에서 찾기
                const replyList = replyForm.closest('.commentItem').querySelector('.reply-list');
                replyList.appendChild(newReply);
                replyTextarea.value = ''; // 텍스트 영역 비우기
                
                // 답글 작성 후 답글 달기 버튼 다시 보이기
                replyForm.style.display = 'none';
                replyForm.closest('.commentItem').querySelector('.reply-btn').style.display = 'block';
            } else {
                alert('답글 내용을 입력해 주세요.');
            }
        }
    });
});