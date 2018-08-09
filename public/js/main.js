$(function() {
  $('a.confirmdeletion').click(function() {
    if(!confirm('Confirm Deletion')) {
      return false;
    }
  });
})
