const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();

  if (comment != "") {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text: comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {

      // Extract the JSON data from the response
      const data = await response.json();

      // Display the comment
      document.getElementById('display-comment').textContent = data.comment.comment_text;

      // Hide form and display the submitted data
      document.getElementById('comment-container').style.display = 'none';
      document.getElementById('display-container').style.display = 'block';
    } else {
      alert('Failed to create comment');
    }
  }
};

//event trigger
document
  .querySelector('.btn-primary')
  .addEventListener('click', newFormHandler);