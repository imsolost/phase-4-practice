console.log('hello from the browser JavaScript')


deletePopup = () => {
  // if ( confirm('Are you sure you want to delete this post?') ) {
  //   fetch( `/delete/${event.target.id}`, { method: 'get' })
  //     .catch( error => res.status(500).render('error', { error } ) )
  // } else {
  //   console.log('canceled')
  // }
}

document.querySelectorAll('.trashcan').forEach( button => {
  button.addEventListener('click', deletePopup )
})
