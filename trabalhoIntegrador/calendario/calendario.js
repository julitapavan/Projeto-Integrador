var calendar;

        $(document).ready(function() {
            // Configuração de idioma para Português (Brasil)
            moment.locale('pt-BR'); // Configura o idioma do Moment.js para português
            calendar = $('#calendar').fullCalendar({
                locale: 'pt-BR', // Define o idioma do calendário como português
                events: [
                    {
                        title: 'Evento de exemplo',
                        start: '2024-12-10',
                        end: '2024-12-12'
                    },
                    {
                        title: 'Outro Evento',
                        start: '2024-12-15',
                        allDay: true
                    }
                ],
                editable: true,
                droppable: true,
                selectable: true,
                select: function(start, end) {
                    var title = prompt("Título do evento:");

                    if (title) {
                        calendar.fullCalendar('renderEvent', {
                            title: title,
                            start: start,
                            end: end
                        });
                    }
                    calendar.fullCalendar('unselect');
                },
                eventClick: function(event, jsEvent, view) {
                    if (confirm("Você deseja excluir este evento?")) {
                        calendar.fullCalendar('removeEvents', event._id);
                    }
                }
            });

            // Button for adding event
            $('#addEventBtn').click(function() {
                var title = prompt("Título do novo evento:");
                var date = prompt("Data do evento (YYYY-MM-DD):");
                if (title && date) {
                    calendar.fullCalendar('renderEvent', {
                        title: title,
                        start: date
                    });
                }
            });
        });