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

const deleteBlogPost = async (blogPostId) => {
  try {
    const response = await fetch(`/api/blogpost/${blogPostId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Delete was successful, perform any necessary UI updates or redirects
      console.log('Blog post deleted successfully');
      //reload the page to reflect the updated list of blog posts
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

const editBlogPost = (blogPostId) => {
  // Find the corresponding blog post container
  const blogPostContainer = document.getElementById(`blogPost-${blogPostId}`);

  // Get the current content
  const title = blogPostContainer.querySelector('.title').innerText;
  const content = blogPostContainer.querySelector('.content').innerText;

  // Create input fields with the current content
  const titleInput = document.createElement('input');
  titleInput.classList.add('form-input');
  titleInput.value = title;

  const contentInput = document.createElement('textarea');
  contentInput.classList.add('form-input');
  contentInput.value = content;

  // Replace the content with the input fields
  blogPostContainer.querySelector('.title').innerHTML = '';
  blogPostContainer.querySelector('.title').appendChild(titleInput);

  blogPostContainer.querySelector('.content').innerHTML = '';
  blogPostContainer.querySelector('.content').appendChild(contentInput);

  const editButton = blogPostContainer.querySelector(`#edit-btn-${blogPostId}`);
  const saveButton = blogPostContainer.querySelector(`#save-btn-${blogPostId}`);

  editButton.style.display = 'none';
  saveButton.style.display = 'inline-block';

  saveButton.addEventListener('click', () => saveBlogPost(blogPostId));
};

const saveBlogPost = async (blogPostId) => {
  // Find the corresponding blog post container
  const blogPostContainer = document.getElementById(`blogPost-${blogPostId}`);

  // Get the updated title and content
  const title = blogPostContainer.querySelector('.title input').value.trim();
  const content = blogPostContainer.querySelector('.content textarea').value.trim();

  if (title && content) {
    try {
      const response = await fetch(`/api/blogpost/${blogPostId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the blog post display with the new content
        blogPostContainer.querySelector('.title').innerHTML = title;
        blogPostContainer.querySelector('.content').innerHTML = content;

        const editButton = blogPostContainer.querySelector(`#edit-btn-${blogPostId}`);
        const saveButton = blogPostContainer.querySelector(`#save-btn-${blogPostId}`);

        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';

      } else {
        alert('Failed to save blog post');
      }
    } catch (err) {
      console.error(err);
      // Handle any network or server errors
    }
  }
};

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', newFormHandler);