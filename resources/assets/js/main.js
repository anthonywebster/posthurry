/**
 * Created by carlosrenato on 02-01-16.
 */
$(function() {

    /**
     * Script to always send csrf-token from laravel to ajax requests
     */
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('select.select2').select2();

    /**
     * Dynamic radio control selection
     */
    $('[name=typeToPost]').on('change', function(e) {
        var selected = this.value;
        if (selected == '0') {
            $('#post1-container .pages-list-container').removeClass('hide').children('.select-pages').attr('disabled', false);
            $('#post1-container .groups-list-container').addClass('hide').children('.select-groups').attr('disabled', true);
            $('#post2-container .pages-list-container').addClass('hide').children('.select-pages').attr('disabled', true);
            $('#post2-container .groups-list-container').removeClass('hide').children('.select-groups').attr('disabled', false);
        }
        /**
         * If 2 pages selected
         */
        else if (selected == '1') {
            $('.groups-list-container').addClass('hide').children('.select-groups').attr('disabled', true);
            $('.pages-list-container').removeClass('hide').children('.select-pages').attr('disabled', false);
        }
        /**
         * If 2 groups selected
         */
        else if (selected == '2') {
            $('.pages-list-container').addClass('hide').children('.select-pages').attr('disabled', true);
            $('.groups-list-container').removeClass('hide').children('.select-groups').attr('disabled', false);
        } else {

        }
    });

    /**
     * Graph
     */
    if ($('#comparison-chart-container').length) {
        var chart;
        var id = $('#comparison_id').val();
        $('.img-loading').removeClass('hide');
        $.ajax({
            url: '/comparison/stats/' + id,
            method: 'post',
            data: {},
            dataType: 'json',
            success: function(data) {
                $('#comparison-chart-container').highcharts({
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Comparison between posts'
                    },
                    xAxis: {
                        categories: ['Likes', 'Shared', 'Comments']
                    },
                    credits: {
                        enabled: false
                    },
                    series: [
                        {
                            name: 'Post 1',
                            data: data.post1,
                            color: '#a1ffa1'
                        },
                        {
                            name: 'Post 2',
                            data: data.post2,
                            color: '#ffa1a1'
                        }]
                });
                $('.img-loading').addClass('hide');
            }
        });



    }

});