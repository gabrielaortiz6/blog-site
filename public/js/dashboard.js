const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogpost-title').value.trim();
  const content = document.querySelector('#blogpost-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create blogpost');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete project');
    }
  }
};

const deleteBlogPost = async (blogPostId) => {
  try {
    const response = await fetch(`/api/blogposts/${blogPostId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      // Delete was successful, perform any necessary UI updates or redirects
      console.log('Blog post deleted successfully');
      // For example, you can reload the page to reflect the updated list of blog posts
      window.location.reload();
    } else {
      // Delete request failed
      console.error('Failed to delete blog post');
      // Handle the error or display an error message to the user
    }
  } catch (err) {
    console.error(err);
    // Handle any network or server errors
  }
};

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blogpost-list')
  .addEventListener('click', delButtonHandler);