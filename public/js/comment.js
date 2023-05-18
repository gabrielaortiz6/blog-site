const newFormHandler = async (event) => {
  console.log('newFormHandler executed');
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();

  if (comment != "") {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // const data = await response.json(); // Extract JSON data from the response

      // Display form data
      // document.getElementById('display-comment').textContent = data.comment.comment_text;
      // document.getElementById('display-email').textContent = email;

      const data = await response.json(); // Extract the JSON data from the response

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

document
  .querySelector('.btn-primary')
  .addEventListener('click', newFormHandler);