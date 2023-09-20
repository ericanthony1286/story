// !(function (context, definition) {
//     if (typeof define == 'function' && typeof define.amd  == 'object') define(['jquery'], definition);
//     else definition(context['$']);
//   } (this, function ($) {
//     // $("#dropbtn").click(function () {
//     //   $(".dropdown_content").classList.toggle("show");
//     // });
//     function showDropdownContent() {
//       $(".dropdown_content").classList.toggle("show");
//     }

// }));

$(function () {

  $("#dropbtn").click(function () {
    $("#myDropdown").toggle("show");
  });
  window.onclick = function(e) {
    if (!e.target.matches('#dropbtn')) {
      if ($("#myDropdownp:contains(show)")) {
        $("#myDropdown").css('display', 'none');
      }
    }
  }
});