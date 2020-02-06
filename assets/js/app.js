$ = window.jQuery;

$(document).ready(() => {
  console.log('Document ready');

  $("#show-profile-button").click(() => {
    let button = $("#show-profile-button");
    let sidebarCollapsed = 'sidebar-collapsed';

    if (button.hasClass(sidebarCollapsed)) {
      button.find('#text-button').text('Ocultar perfil');
      button.removeClass(sidebarCollapsed);
      $('#sidebar').slideDown();
    } else {
      button.find('#text-button').text('Mostrar perfil');
      button.addClass(sidebarCollapsed);
      $('#sidebar').slideUp();
    }
  });
});