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

  // Create a save button
  const saveButton = document.createElement('button');
  saveButton.classList.add('btn', 'btn-primary');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => saveBlogPost(blogPostId));
  
  // Replace the edit button with the save button
  blogPostContainer.querySelector('.edit-button').replaceWith(saveButton);
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

        // Create a new edit button
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'edit-button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editBlogPost(blogPostId));

        // Replace the save button with the edit button
        blogPostContainer.querySelector('.save-button').replaceWith(editButton);
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