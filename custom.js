$(document).ready(function() {
		function trackOrder(data) {
			$.ajax({
				url: data,
				type: 'GET',
				headers: {
					Token: "PK2spsISXbg8pkaZmkaoAGlpeMUxvQULJSOPkjL/T23wogDo8TyJ6MJUiLN/2JZTuAj4oQAHSi6kOgCatrZqng=="
				},
				dataType: 'json',
				success: function (response) {
					var dataObj = (response);
					console.log(response);
					$('.shipment-address').html(dataObj.Result.delivAddress);
					$('.contact-details span').eq(0).html(dataObj.Result.delivPhoneNum);
					$('.contact-details span').eq(1).html(dataObj.Result.delivEmail);
					$('.order-id td').eq(1).html(dataObj.Result.orderId);
					$('.order-date td').eq(1).html(dataObj.Result.orderDate);
					$('.paid-amount td').eq(1).html(dataObj.Result.amount);
					$('.paid-amount td').eq(1).html(dataObj.Result.amount);
					var trackingState = dataObj.Result.trackingStatus.Data["0"].TrackingStatus;
					var orderedDates = trackingState.sort(function (a, b) {
						return Date.parse(a.date) < Date.parse(b.date);
					});
					$('.time-span').html("(Last at " + orderedDates[0].location + " " + orderedDates[0].date + ")");
          $('.current-state').html(orderedDates[0].status);
          var status = dataObj.Result.orderStatus;
          var i=0;
          $(status).each(function(){
          	if ($(this) !== "null"){
							$($('.state-path')[i]).css("background-color","#606060");
							$($('.state')[i]).css("border-color", "#ffb900");
          		i =+1;
            }
          });
					$($('.state-path')[i]).css("background","linear-gradient(to right, #606060 , #d9d9d9)");
				}
			});
		}
			$('.track-order-button').on('click', function () {
				var trackID = $('#tracking-id').val();
				var url = "http://api.nowfloatsdev.com/ProductCatalogue/v1/floatingpoints/trackOrder?orderId=" + trackID + "";
				trackOrder(url);
        $('.delivery-bike img').css('left','100vw');
				$('.overlay-header').fadeOut(1600, function(){
				$('.header-container').fadeIn(500);
				});
			});
		});