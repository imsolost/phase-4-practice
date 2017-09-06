console.log('hello from the browser JavaScript')

deletePopup = () => {
  if ( confirm('Are you sure you want to delete this post?') ) {
    fetch( `/delete/${event.target.id}`, {
      method: 'delete',
      credentials: 'include'
    })
      .then( location.reload() )
      .catch( err => res.status(500).render('err', { err } ) )
  }
}

const emptyCheck = () => {
  const inputs = document.querySelectorAll('.form-input')

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      alert('input fields cannot be blank')
      return false
    }
  }
}

document.querySelectorAll('.trashcan').forEach( button => {
  button.addEventListener('click', deletePopup )
})
