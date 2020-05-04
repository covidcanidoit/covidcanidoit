import populartimes as ptimes
import pandas as pd
import numpy as np

import googlemaps


from time import sleep

from flaskapp.config import BaseConfig


def get_lat_lng(geocode_dic):
    return (
        geocode_dic["geometry"]["location"]["lat"],
        geocode_dic["geometry"]["location"]["lng"],
    )

def get_place_data(place_id):
    results = ptimes.get_id(BaseConfig.GMAPS_API_KEY, place_id)
    return results

def get_ptimes_data(location, name):
    gmaps = googlemaps.Client(key=BaseConfig.GMAPS_API_KEY)

    # We want a lat/long of the place
    # This helps to generalize things
    # `location` can be "NYC" or "395 Brittingham Dr" or "11030" etc
    full_list_geocoded_locations = gmaps.geocode(
        address=location
    )  # latitude/longitude value

    cur_coordinates = get_lat_lng(
        full_list_geocoded_locations[0]
    )  # take the first place (limitatino)

    full_places_list = gmaps.places(
        name, location=cur_coordinates
    )  # maybe filter with arg "type" later

    place_id = full_places_list["results"][0][
        "place_id"
    ]  # ONLY get FIRST returned place's place ID (limitation)

    results = ptimes.get_id(BaseConfig.GMAPS_API_KEY, place_id)

    return results  # only returning first rn, definitely a limitation
