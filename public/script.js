$(document).ready(function() {
    var selectedDate; // Variável para armazenar a data selecionada
    var selectedBarber; // Variável para armazenar o barbeiro selecionado
    var appointments = {}; // Objeto para armazenar os agendamentos por barbeiro

    // Adicione um evento de clique às imagens dos barbeiros
    $('.barber-img').on('click', function() {
        selectedBarber = $(this).data('barber');
        $('#selectedBarber').text(selectedBarber); // Atualize o nome do barbeiro no modal
        $('#appointmentModal').modal('show'); // Abra o modal de agendamento
    });

    // Initialize the calendar
    $('#calendar').fullCalendar({
        defaultView: 'month',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
            // Handle the selected date here
            selectedDate = moment(start).format('YYYY-MM-DD');
        }
    });

    // Manipule o clique no botão "Agendar" no modal
    $('#bookAppointment').on('click', function() {
        if (!selectedDate) {
            alert('Selecione uma data no calendário.');
            return;
        }

        var selectedTime = $('#timeslot').val();
        var appointment = 'Data: ' + selectedDate + ' Hora: ' + selectedTime;

        // Verifique se o objeto appointments já possui uma chave para o barbeiro selecionado
        if (!appointments[selectedBarber]) {
            appointments[selectedBarber] = []; // Se não existir, crie um array vazio para o barbeiro
        }

        // Adicione o agendamento ao array de agendamentos do barbeiro selecionado
        appointments[selectedBarber].push(appointment);

        // Atualize a lista de agendamentos na página
        updateScheduledDates();

        alert('Você agendou um horario: ' + appointment);
        $('#appointmentModal').modal('hide'); // Feche o modal de agendamento
    });

    // Função para atualizar a lista de agendamentos
    function updateScheduledDates() {
        var $scheduledDates = $('#scheduledDates');
        $scheduledDates.empty();

        // Percorra cada barbeiro no objeto appointments
        for (var barber in appointments) {
            if (appointments.hasOwnProperty(barber)) {
                // Crie um item de lista para cada agendamento do barbeiro
                var $barberItem = $('<li>').text(barber + ':');
                var $appointmentsList = $('<ul>');

                // Adicione cada agendamento do barbeiro à lista
                for (var i = 0; i < appointments[barber].length; i++) {
                    var $appointmentItem = $('<li>').text(appointments[barber][i]);
                    $appointmentsList.append($appointmentItem);
                }

                $barberItem.append($appointmentsList);
                $scheduledDates.append($barberItem);
            }
        }
    }
});

$(document).ready(function() {
    $('.barber-img').on('click', function() {
        var selectedBarber = $(this).data('barber');
        var selectedDate = moment().format('YYYY-MM-DD'); // Supondo que você queira agendar para hoje

        var selectedTime = prompt("Escolha um horário para agendar com " + selectedBarber + " (Formato: HH:MM AM/PM)");

        if (selectedTime !== null && selectedTime !== "") {
            var appointment = 'Barbeiro: ' + selectedBarber + ', Data: ' + selectedDate + ', Hora: ' + selectedTime;
            window.open('index.html?appointment=' + encodeURIComponent(appointment), 'Agendamento', 'width=600,height=400');
        }
    });
});


function initMap() {
    // Coordenadas do local (exemplo: latitude e longitude)
    var localCoords = { lat: -23.61191, lng: -46.48445 };

    // Opções do mapa
    var mapOptions = {
        center: localCoords,
        zoom: 15
    };

    // Criar o mapa
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Adicionar marcador
    var marker = new google.maps.Marker({
        position: localCoords,
        map: map,
        title: 'Rua antonio arenso 61'
    });
}