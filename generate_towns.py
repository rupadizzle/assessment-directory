#!/usr/bin/env python3
import json
import math

# Comprehensive list of UK towns with real data
towns_data = [
    # England - Major Cities
    {"name": "London", "county": "Greater London", "region": "London", "lat": 51.5074, "lng": -0.1278, "population": 8900000},
    {"name": "Birmingham", "county": "West Midlands", "region": "West Midlands", "lat": 52.5086, "lng": -1.8783, "population": 1141900},
    {"name": "Manchester", "county": "Greater Manchester", "region": "North West", "lat": 53.4808, "lng": -2.2426, "population": 547627},
    {"name": "Leeds", "county": "West Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.8008, "lng": -1.5491, "population": 793139},
    {"name": "Glasgow", "county": "Glasgow City", "region": "Scotland", "lat": 55.8642, "lng": -4.2518, "population": 633640},
    {"name": "Liverpool", "county": "Merseyside", "region": "North West", "lat": 53.4084, "lng": -2.9916, "population": 498042},
    {"name": "Newcastle upon Tyne", "county": "Tyne and Wear", "region": "North East", "lat": 54.9783, "lng": -1.6178, "population": 302820},
    {"name": "Sheffield", "county": "South Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.3811, "lng": -1.4701, "population": 584853},
    {"name": "Bristol", "county": "Bristol", "region": "South West", "lat": 51.4545, "lng": -2.5879, "population": 465377},
    {"name": "Edinburgh", "county": "Edinburgh", "region": "Scotland", "lat": 55.9533, "lng": -3.1883, "population": 530990},

    # England - Major Towns (South East)
    {"name": "London", "county": "Greater London", "region": "London", "lat": 51.5074, "lng": -0.1278, "population": 8900000},
    {"name": "Brighton and Hove", "county": "Brighton and Hove", "region": "South East", "lat": 50.8658, "lng": -0.0837, "population": 290885},
    {"name": "Reading", "county": "Berkshire", "region": "South East", "lat": 51.4545, "lng": -0.9719, "population": 174224},
    {"name": "Southampton", "county": "Hampshire", "region": "South East", "lat": 50.9097, "lng": -1.4044, "population": 252190},
    {"name": "Oxford", "county": "Oxfordshire", "region": "South East", "lat": 51.7520, "lng": -1.2577, "population": 171380},
    {"name": "Cambridge", "county": "Cambridgeshire", "region": "East of England", "lat": 52.2053, "lng": 0.1218, "population": 123867},
    {"name": "Canterbury", "county": "Kent", "region": "South East", "lat": 51.2797, "lng": 1.0830, "population": 54240},
    {"name": "Windsor", "county": "Berkshire", "region": "South East", "lat": 51.4833, "lng": -0.6167, "population": 32700},
    {"name": "Guildford", "county": "Surrey", "region": "South East", "lat": 51.2387, "lng": -0.5731, "population": 77057},
    {"name": "Croydon", "county": "Greater London", "region": "London", "lat": 51.3763, "lng": -0.1006, "population": 385322},

    # England - South West
    {"name": "Bristol", "county": "Bristol", "region": "South West", "lat": 51.4545, "lng": -2.5879, "population": 465377},
    {"name": "Exeter", "county": "Devon", "region": "South West", "lat": 50.7184, "lng": -3.5339, "population": 130576},
    {"name": "Plymouth", "county": "Devon", "region": "South West", "lat": 50.3755, "lng": -4.1427, "population": 262411},
    {"name": "Cornish", "county": "Cornwall", "region": "South West", "lat": 50.5009, "lng": -4.9000, "population": 35000},
    {"name": "Truro", "county": "Cornwall", "region": "South West", "lat": 50.2637, "lng": -5.0504, "population": 20468},
    {"name": "Bournemouth", "county": "Dorset", "region": "South West", "lat": 50.7352, "lng": -1.8309, "population": 183541},
    {"name": "Poole", "county": "Dorset", "region": "South West", "lat": 50.7411, "lng": -1.9897, "population": 151489},
    {"name": "Bath", "county": "Somerset", "region": "South West", "lat": 51.3793, "lng": -2.3625, "population": 88859},
    {"name": "Weston-super-Mare", "county": "Somerset", "region": "South West", "lat": 51.3393, "lng": -2.6289, "population": 82123},
    {"name": "Gloucester", "county": "Gloucestershire", "region": "West Midlands", "lat": 51.8642, "lng": -2.2431, "population": 127202},

    # England - East Midlands
    {"name": "Nottingham", "county": "Nottinghamshire", "region": "East Midlands", "lat": 52.9547, "lng": -1.1581, "population": 323886},
    {"name": "Leicester", "county": "Leicestershire", "region": "East Midlands", "lat": 52.6369, "lng": -1.1398, "population": 368577},
    {"name": "Coventry", "county": "West Midlands", "region": "West Midlands", "lat": 52.4062, "lng": -1.4773, "population": 344424},
    {"name": "Derby", "county": "Derbyshire", "region": "East Midlands", "lat": 52.9225, "lng": -1.4767, "population": 257457},
    {"name": "Stoke-on-Trent", "county": "Staffordshire", "region": "West Midlands", "lat": 53.0290, "lng": -2.1797, "population": 276713},
    {"name": "Peterborough", "county": "Cambridgeshire", "region": "East of England", "lat": 52.5711, "lng": -0.2416, "population": 202993},
    {"name": "Lincoln", "county": "Lincolnshire", "region": "East Midlands", "lat": 53.2265, "lng": -0.5427, "population": 97975},
    {"name": "Grantham", "county": "Lincolnshire", "region": "East Midlands", "lat": 52.9080, "lng": -0.6422, "population": 43847},
    {"name": "Mansfield", "county": "Nottinghamshire", "region": "East Midlands", "lat": 53.1469, "lng": -1.1976, "population": 76973},
    {"name": "Chesterfield", "county": "Derbyshire", "region": "East Midlands", "lat": 53.2314, "lng": -1.4214, "population": 113057},

    # England - West Midlands
    {"name": "Birmingham", "county": "West Midlands", "region": "West Midlands", "lat": 52.5086, "lng": -1.8783, "population": 1141900},
    {"name": "Coventry", "county": "West Midlands", "region": "West Midlands", "lat": 52.4062, "lng": -1.4773, "population": 344424},
    {"name": "Wolverhampton", "county": "West Midlands", "region": "West Midlands", "lat": 52.5905, "lng": -2.1294, "population": 260494},
    {"name": "Dudley", "county": "West Midlands", "region": "West Midlands", "lat": 52.5059, "lng": -2.0783, "population": 318099},
    {"name": "Walsall", "county": "West Midlands", "region": "West Midlands", "lat": 52.5844, "lng": -1.9822, "population": 282098},
    {"name": "Worcester", "county": "Worcestershire", "region": "West Midlands", "lat": 52.1896, "lng": -2.2191, "population": 101563},
    {"name": "Hereford", "county": "Herefordshire", "region": "West Midlands", "lat": 52.0597, "lng": -2.7164, "population": 55883},
    {"name": "Tamworth", "county": "Staffordshire", "region": "West Midlands", "lat": 52.6346, "lng": -1.6899, "population": 76886},
    {"name": "Cannock", "county": "Staffordshire", "region": "West Midlands", "lat": 52.6909, "lng": -1.9731, "population": 70715},
    {"name": "Telford", "county": "Shropshire", "region": "West Midlands", "lat": 52.6243, "lng": -2.4433, "population": 177099},

    # England - North West
    {"name": "Manchester", "county": "Greater Manchester", "region": "North West", "lat": 53.4808, "lng": -2.2426, "population": 547627},
    {"name": "Liverpool", "county": "Merseyside", "region": "North West", "lat": 53.4084, "lng": -2.9916, "population": 498042},
    {"name": "Chester", "county": "Cheshire", "region": "North West", "lat": 53.1904, "lng": -2.8929, "population": 120104},
    {"name": "Warrington", "county": "Cheshire", "region": "North West", "lat": 53.3909, "lng": -2.5928, "population": 209815},
    {"name": "Stockport", "county": "Greater Manchester", "region": "North West", "lat": 53.4084, "lng": -2.1572, "population": 291560},
    {"name": "Wigan", "county": "Greater Manchester", "region": "North West", "lat": 53.5454, "lng": -2.6267, "population": 326876},
    {"name": "Bolton", "county": "Greater Manchester", "region": "North West", "lat": 53.5764, "lng": -2.4301, "population": 296269},
    {"name": "Oldham", "county": "Greater Manchester", "region": "North West", "lat": 53.5408, "lng": -2.1156, "population": 274394},
    {"name": "Blackburn", "county": "Lancashire", "region": "North West", "lat": 53.7447, "lng": -2.4829, "population": 123400},
    {"name": "Preston", "county": "Lancashire", "region": "North West", "lat": 53.7632, "lng": -2.7031, "population": 142479},

    # England - Yorkshire and the Humber
    {"name": "Leeds", "county": "West Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.8008, "lng": -1.5491, "population": 793139},
    {"name": "Sheffield", "county": "South Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.3811, "lng": -1.4701, "population": 584853},
    {"name": "Bradford", "county": "West Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.7930, "lng": -1.7547, "population": 365269},
    {"name": "Huddersfield", "county": "West Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.6451, "lng": -1.7822, "population": 191179},
    {"name": "Wakefield", "county": "West Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.6832, "lng": -1.4965, "population": 343097},
    {"name": "York", "county": "North Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.9581, "lng": -1.0873, "population": 209181},
    {"name": "Hull", "county": "East Riding of Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.7457, "lng": -0.3368, "population": 259778},
    {"name": "Doncaster", "county": "South Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.5226, "lng": -1.1307, "population": 304028},
    {"name": "Rotherham", "county": "South Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.4328, "lng": -1.3567, "population": 258866},
    {"name": "Halifax", "county": "West Yorkshire", "region": "Yorkshire and the Humber", "lat": 53.7195, "lng": -1.8673, "population": 82497},

    # England - North East
    {"name": "Newcastle upon Tyne", "county": "Tyne and Wear", "region": "North East", "lat": 54.9783, "lng": -1.6178, "population": 302820},
    {"name": "Sunderland", "county": "Tyne and Wear", "region": "North East", "lat": 54.9045, "lng": -1.3852, "population": 280807},
    {"name": "Durham", "county": "County Durham", "region": "North East", "lat": 54.7753, "lng": -1.5743, "population": 47000},
    {"name": "Gateshead", "county": "Tyne and Wear", "region": "North East", "lat": 54.9634, "lng": -1.6619, "population": 200759},
    {"name": "Middlesbrough", "county": "North Yorkshire", "region": "North East", "lat": 54.5761, "lng": -1.2355, "population": 147385},
    {"name": "Darlington", "county": "County Durham", "region": "North East", "lat": 54.5225, "lng": -1.5507, "population": 99625},
    {"name": "Stockton-on-Tees", "county": "County Durham", "region": "North East", "lat": 54.5700, "lng": -1.3179, "population": 193674},
    {"name": "Hartlepool", "county": "County Durham", "region": "North East", "lat": 54.6851, "lng": -1.2051, "population": 88855},
    {"name": "Whitley Bay", "county": "Tyne and Wear", "region": "North East", "lat": 55.0539, "lng": -1.4261, "population": 36000},
    {"name": "Tynemouth", "county": "Tyne and Wear", "region": "North East", "lat": 55.0147, "lng": -1.4226, "population": 68000},

    # East of England
    {"name": "Peterborough", "county": "Cambridgeshire", "region": "East of England", "lat": 52.5711, "lng": -0.2416, "population": 202993},
    {"name": "Cambridge", "county": "Cambridgeshire", "region": "East of England", "lat": 52.2053, "lng": 0.1218, "population": 123867},
    {"name": "Norwich", "county": "Norfolk", "region": "East of England", "lat": 52.6281, "lng": 1.2974, "population": 143395},
    {"name": "Ipswich", "county": "Suffolk", "region": "East of England", "lat": 52.0534, "lng": 1.1442, "population": 133384},
    {"name": "Chelmsford", "county": "Essex", "region": "East of England", "lat": 51.7371, "lng": 0.4766, "population": 174218},
    {"name": "Great Yarmouth", "county": "Norfolk", "region": "East of England", "lat": 52.6142, "lng": 1.7304, "population": 96000},
    {"name": "Huntingdon", "county": "Cambridgeshire", "region": "East of England", "lat": 52.3318, "lng": -0.1863, "population": 24882},
    {"name": "March", "county": "Cambridgeshire", "region": "East of England", "lat": 52.5383, "lng": -0.0456, "population": 21188},
    {"name": "Wisbech", "county": "Cambridgeshire", "region": "East of England", "lat": 52.6580, "lng": -0.1626, "population": 32388},
    {"name": "Thetford", "county": "Norfolk", "region": "East of England", "lat": 52.4061, "lng": 0.7585, "population": 24340},

    # Wales
    {"name": "Cardiff", "county": "Cardiff", "region": "Wales", "lat": 51.4816, "lng": -3.1791, "population": 362310},
    {"name": "Swansea", "county": "Swansea", "region": "Wales", "lat": 51.6213, "lng": -3.9433, "population": 239023},
    {"name": "Newport", "county": "Newport", "region": "Wales", "lat": 51.5862, "lng": -2.9980, "population": 126854},
    {"name": "Wrexham", "county": "Wrexham", "region": "Wales", "lat": 53.0469, "lng": -2.9948, "population": 61603},
    {"name": "Bangor", "county": "Gwynedd", "region": "Wales", "lat": 53.2281, "lng": -4.1295, "population": 13725},
    {"name": "Aberystwyth", "county": "Ceredigion", "region": "Wales", "lat": 52.4118, "lng": -4.0837, "population": 15711},
    {"name": "Caerphilly", "county": "Caerphilly", "region": "Wales", "lat": 51.4477, "lng": -3.2148, "population": 171056},
    {"name": "Llanelli", "county": "Carmarthenshire", "region": "Wales", "lat": 51.6804, "lng": -3.8155, "population": 38777},
    {"name": "Carmarthen", "county": "Carmarthenshire", "region": "Wales", "lat": 51.8564, "lng": -3.8711, "population": 14902},
    {"name": "Merthyr Tydfil", "county": "Merthyr Tydfil", "region": "Wales", "lat": 51.7465, "lng": -3.3740, "population": 58802},

    # Scotland
    {"name": "Glasgow", "county": "Glasgow City", "region": "Scotland", "lat": 55.8642, "lng": -4.2518, "population": 633640},
    {"name": "Edinburgh", "county": "Edinburgh", "region": "Scotland", "lat": 55.9533, "lng": -3.1883, "population": 530990},
    {"name": "Aberdeen", "county": "Aberdeen City", "region": "Scotland", "lat": 57.1497, "lng": -2.0943, "population": 195651},
    {"name": "Dundee", "county": "Dundee City", "region": "Scotland", "lat": 56.4627, "lng": -2.9707, "population": 148210},
    {"name": "Paisley", "county": "Renfrewshire", "region": "Scotland", "lat": 55.8446, "lng": -4.4314, "population": 76084},
    {"name": "East Kilbride", "county": "South Lanarkshire", "region": "Scotland", "lat": 55.7681, "lng": -4.1823, "population": 75269},
    {"name": "Inverness", "county": "Highland", "region": "Scotland", "lat": 57.4778, "lng": -4.2247, "population": 63711},
    {"name": "Stirling", "county": "Stirling", "region": "Scotland", "lat": 56.1165, "lng": -3.9369, "population": 37350},
    {"name": "Ayr", "county": "South Ayrshire", "region": "Scotland", "lat": 55.4592, "lng": -4.6289, "population": 46982},
    {"name": "Dingwall", "county": "Highland", "region": "Scotland", "lat": 57.5967, "lng": -4.4186, "population": 5689},

    # Northern Ireland
    {"name": "Belfast", "county": "Belfast", "region": "Northern Ireland", "lat": 54.5973, "lng": -5.9301, "population": 343626},
    {"name": "Derry", "county": "Derry", "region": "Northern Ireland", "lat": 55.0031, "lng": -7.3046, "population": 83027},
    {"name": "Lisburn", "county": "Lisburn and Castlereagh", "region": "Northern Ireland", "lat": 54.5063, "lng": -6.0608, "population": 71443},
    {"name": "Armagh", "county": "Armagh City, Banbridge and Craigavon", "region": "Northern Ireland", "lat": 54.3510, "lng": -6.6527, "population": 14590},
    {"name": "Newry", "county": "Newry, Mourne and Down", "region": "Northern Ireland", "lat": 54.1748, "lng": -6.3350, "population": 28592},
    {"name": "Bangor", "county": "North Down", "region": "Northern Ireland", "lat": 54.6774, "lng": -5.6731, "population": 58271},
    {"name": "Craigavon", "county": "Armagh City, Banbridge and Craigavon", "region": "Northern Ireland", "lat": 54.4411, "lng": -6.4131, "population": 82882},
    {"name": "Ballymena", "county": "Mid and East Antrim", "region": "Northern Ireland", "lat": 54.8645, "lng": -6.2770, "population": 29763},
    {"name": "Antrim", "county": "Antrim and Newtownabbey", "region": "Northern Ireland", "lat": 54.7187, "lng": -6.2159, "population": 21627},
    {"name": "Larne", "county": "Mid and East Antrim", "region": "Northern Ireland", "lat": 54.8572, "lng": -5.8151, "population": 30830},
]

# Generate additional towns to reach 1200
additional_towns = [
    # More South East towns
    {"name": "Hastings", "county": "East Sussex", "region": "South East", "lat": 50.8552, "lng": 0.5725, "population": 90098},
    {"name": "Eastbourne", "county": "East Sussex", "region": "South East", "lat": 50.7684, "lng": 0.2818, "population": 100290},
    {"name": "Tunbridge Wells", "county": "Kent", "region": "South East", "lat": 51.1313, "lng": 0.2681, "population": 64900},
    {"name": "Medway", "county": "Kent", "region": "South East", "lat": 51.3905, "lng": 0.5262, "population": 277698},
    {"name": "Slough", "county": "Berkshire", "region": "South East", "lat": 51.5082, "lng": -0.5960, "population": 158025},
    {"name": "Bracknell", "county": "Berkshire", "region": "South East", "lat": 51.4150, "lng": -0.7490, "population": 113205},
    {"name": "Woking", "county": "Surrey", "region": "South East", "lat": 51.3226, "lng": -0.5599, "population": 101788},
    {"name": "Crawley", "county": "West Sussex", "region": "South East", "lat": 51.1090, "lng": -0.1880, "population": 106597},
    {"name": "Worthing", "county": "West Sussex", "region": "South East", "lat": 50.8195, "lng": -0.3719, "population": 110000},
    {"name": "Chichester", "county": "West Sussex", "region": "South East", "lat": 50.8371, "lng": -0.7821, "population": 31600},

    # More South West towns
    {"name": "Torbay", "county": "Devon", "region": "South West", "lat": 50.4545, "lng": -3.5281, "population": 132400},
    {"name": "Torquay", "county": "Devon", "region": "South West", "lat": 50.4645, "lng": -3.5331, "population": 65000},
    {"name": "Paignton", "county": "Devon", "region": "South West", "lat": 50.4356, "lng": -3.5576, "population": 50000},
    {"name": "Ilfracombe", "county": "Devon", "region": "South West", "lat": 51.2090, "lng": -4.1175, "population": 11000},
    {"name": "Swindon", "county": "Wiltshire", "region": "South West", "lat": 51.5537, "lng": -1.7684, "population": 185609},
    {"name": "Salisbury", "county": "Wiltshire", "region": "South West", "lat": 51.0687, "lng": -1.7951, "population": 40500},
    {"name": "Dorchester", "county": "Dorset", "region": "South West", "lat": 50.8103, "lng": -2.4381, "population": 16590},
    {"name": "Weymouth", "county": "Dorset", "region": "South West", "lat": 50.6118, "lng": -2.4589, "population": 52400},
    {"name": "Bridgwater", "county": "Somerset", "region": "South West", "lat": 51.1282, "lng": -2.9894, "population": 35000},
    {"name": "Taunton", "county": "Somerset", "region": "South West", "lat": 51.0194, "lng": -3.1048, "population": 64761},
]

# Combine all towns and remove duplicates
all_towns = towns_data + additional_towns
seen = set()
unique_towns = []
for town in all_towns:
    key = (town["name"], town["county"])
    if key not in seen:
        seen.add(key)
        unique_towns.append(town)

# Create slugs and add nearby_towns field
for town in unique_towns:
    town["slug"] = town["name"].lower().replace(" ", "-").replace(".", "")
    town["nearby_towns"] = []

# Sort alphabetically by name
unique_towns.sort(key=lambda x: x["name"])

# Generate more towns to reach 1200
def generate_additional_towns(current_count, target_count):
    """Generate additional towns to reach target count"""

    additional = []

    # Define regional towns by category
    regions_towns = {
        "South East": [
            ("Aylesbury", "Buckinghamshire", 51.8150, -0.8136, 69000),
            ("Maidenhead", "Berkshire", 51.5213, -0.7266, 75000),
            ("Wantage", "Oxfordshire", 51.5836, -1.4373, 10000),
            ("Banbury", "Oxfordshire", 52.0617, -1.3444, 48000),
            ("Swindon", "Wiltshire", 51.5537, -1.7684, 185609),
            ("High Wycombe", "Buckinghamshire", 51.6306, -0.7490, 90000),
            ("Watford", "Hertfordshire", 51.6545, -0.4042, 96000),
            ("Hemel Hempstead", "Hertfordshire", 51.7418, -0.4656, 82000),
            ("Stevenage", "Hertfordshire", 51.9010, -0.2044, 81000),
            ("Hitchin", "Hertfordshire", 51.9574, -0.2885, 32000),
            ("Welwyn Garden City", "Hertfordshire", 51.8039, -0.2003, 46000),
            ("Hatfield", "Hertfordshire", 51.7589, -0.2283, 28000),
            ("Letchworth Garden City", "Hertfordshire", 51.9826, -0.2197, 31000),
            ("Harlow", "Essex", 51.7600, 0.1245, 82000),
            ("Basildon", "Essex", 51.5769, 0.4783, 111000),
            ("Southend-on-Sea", "Essex", 51.5398, 0.7191, 180000),
            ("Colchester", "Essex", 51.8949, 0.9026, 121000),
            ("Southend", "Essex", 51.5398, 0.7191, 180000),
            ("Brentwood", "Essex", 51.6304, 0.3050, 53000),
            ("Enfield", "Greater London", 51.6534, -0.0859, 33400),
        ],
        "East of England": [
            ("King's Lynn", "Norfolk", 52.7499, 0.4009, 46000),
            ("Diss", "Norfolk", 52.3681, 1.1091, 8000),
            ("Fakenham", "Norfolk", 52.8269, 0.8498, 8000),
            ("Wymondham", "Norfolk", 52.5624, 1.1179, 14000),
            ("Swaffham", "Norfolk", 52.7348, 0.7081, 7000),
            ("Lowestoft", "Suffolk", 52.4781, 1.7587, 71000),
            ("Woodbridge", "Suffolk", 52.0915, 1.3181, 11000),
            ("Sudbury", "Suffolk", 52.0379, 0.7288, 11000),
            ("Newmarket", "Suffolk", 52.2397, 0.4094, 20000),
            ("Cambridge", "Cambridgeshire", 52.2053, 0.1218, 123867),
            ("Royston", "Hertfordshire", 52.0387, -0.0302, 16000),
            ("Saffron Walden", "Essex", 52.2240, 0.4420, 16000),
        ],
        "South West": [
            ("Barnstaple", "Devon", 51.0820, -4.0628, 33000),
            ("Bideford", "Devon", 51.0167, -4.2000, 17000),
            ("Okehampton", "Devon", 50.7397, -3.8900, 10000),
            ("Crediton", "Devon", 50.7819, -3.5978, 8000),
            ("Tavistock", "Devon", 50.5184, -4.1389, 4000),
            ("Totnes", "Devon", 50.4361, -3.6847, 9000),
            ("Dartmouth", "Devon", 50.3563, -3.5774, 6000),
            ("Axminster", "Devon", 50.7820, -2.9920, 5000),
            ("Budleigh Salterton", "Devon", 50.5907, -3.3710, 6000),
            ("Sidmouth", "Devon", 50.6823, -3.2451, 12000),
            ("Seaton", "Devon", 50.7108, -3.0897, 7000),
            ("Lyme Regis", "Dorset", 50.7261, -2.9453, 4000),
            ("Bridport", "Dorset", 50.7365, -2.7576, 9000),
            ("Axmouth", "Devon", 50.7708, -2.9739, 1500),
            ("Sidlesham", "West Sussex", 50.7750, -0.8517, 2500),
            ("Bognor Regis", "West Sussex", 50.7764, -0.6799, 63000),
            ("Littlehampton", "West Sussex", 50.8063, -0.5423, 29000),
            ("Arundel", "West Sussex", 50.8606, -0.5531, 3800),
            ("Midhurst", "West Sussex", 50.9834, -0.6337, 5000),
            ("Petworth", "West Sussex", 51.0049, -0.6203, 2200),
        ],
        "West Midlands": [
            ("Shrewsbury", "Shropshire", 52.7099, -2.7527, 76782),
            ("Stafford", "Staffordshire", 52.8078, -2.1201, 131682),
            ("Lichfield", "Staffordshire", 52.6753, -1.8350, 32404),
            ("Walsall", "West Midlands", 52.5844, "lng": -1.9822, "population": 282098),
            ("Wolverhampton", "West Midlands", 52.5905, "lng": -2.1294, "population": 260494),
            ("Nuneaton", "Warwickshire", 52.3754, "lng": -1.4653, "population": 81700),
            ("Bedworth", "Warwickshire", 52.4508, "lng": -1.4683, "population": 31600),
            ("Leamington Spa", "Warwickshire", 52.2878, "lng": -1.5353, "population": 48000),
            ("Warwick", "Warwickshire", 52.2831, "lng": -1.5841, "population": 28339),
            ("Kenilworth", "Warwickshire", 52.3439, "lng": -1.5762, "population": 29000),
            ("Rugby", "Warwickshire", 52.3783, "lng": -1.2656, "population": 75406),
            ("Whitnash", "Warwickshire", 52.2766, "lng": -1.5316, "population": 8500),
            ("Daventry", "Northamptonshire", 52.2535, "lng": -1.1698, "population": 21000),
            ("Wellingborough", "Northamptonshire", 52.2986, "lng": -0.6945, "population": 47000),
            ("Northampton", "Northamptonshire", 52.2453, "lng": -0.8811, "population": 215100),
            ("Kettering", "Northamptonshire", 52.3952, "lng": -0.7221, "population": 51000),
            ("Corby", "Northamptonshire", 52.4925, "lng": -0.6234, "population": 56500),
            ("Market Harborough", "Leicestershire", 52.3834, "lng": -0.7944, "population": 22000),
            ("Hinckley", "Leicestershire", 52.5393, "lng": -1.3575, "population": 44000),
            ("Coalville", "Leicestershire", 52.6947, "lng": -1.4103, "population": 36000),
        ],
        "East Midlands": [
            ("Loughborough", "Leicestershire", 52.6369, -1.2017, 68000),
            ("Melton Mowbray", "Leicestershire", 52.7617, -0.8961, 28000),
            ("Ashby-de-la-Zouch", "Leicestershire", 52.7422, -1.4683, 12000),
            ("Beeston", "Nottinghamshire", 52.8853, -1.2211, 36000),
            ("Worksop", "Nottinghamshire", 53.3002, -1.1567, 39000),
            ("Sutton-in-Ashfield", "Nottinghamshire", 53.1397, -1.2622, 39000),
            ("Kirkby-in-Ashfield", "Nottinghamshire", 53.0888, -1.2674, 30000),
            ("Eastwood", "Nottinghamshire", 53.0533, -1.2264, 33000),
            ("Alfreton", "Derbyshire", 53.1169, -1.3947, 24000),
            ("Matlock", "Derbyshire", 53.1408, -1.3094, 11000),
            ("Wirksworth", "Derbyshire", 53.1889, -1.4522, 5000),
            ("Ashbourne", "Derbyshire", 52.9891, -1.4736, 8000),
            ("Burton upon Trent", "Staffordshire", 52.8009, -1.6448, 72000),
            ("Uttoxeter", "Staffordshire", 52.8887, -1.8694, 12000),
            ("Rugeley", "Staffordshire", 52.7309, -1.9406, 24000),
            ("Hednesford", "Staffordshire", 52.6987, -1.9919, 20000),
            ("Cannock", "Staffordshire", 52.6909, -1.9731, 70715),
            ("Penkridge", "Staffordshire", 52.6916, -2.0778, 9000),
            ("Chasetown", "Staffordshire", 52.6536, -1.9119, 7000),
            ("Towcester", "Northamptonshire", 52.1582, -1.1947, 9000),
        ],
        "North West": [
            ("Carlisle", "Cumbria", 54.8925, -2.9344, 107524),
            ("Penrith", "Cumbria", 54.6618, -2.7498, 15181),
            ("Kendal", "Cumbria", 54.3286, -2.7423, 29532),
            ("Windermere", "Cumbria", 54.3817, -2.9239, 8900),
            ("Ambleside", "Cumbria", 54.4301, -2.9647, 3000),
            ("Keswick", "Cumbria", 54.5980, -3.1376, 5000),
            ("Whitehaven", "Cumbria", 54.5470, -3.5921, 23000),
            ("Workington", "Cumbria", 54.6388, -3.5402, 35000),
            ("Maryport", "Cumbria", 54.6959, -3.4923, 11000),
            ("Cockermouth", "Cumbria", 54.6689, -3.3755, 7000),
            ("Wigton", "Cumbria", 54.8391, -3.3119, 6000),
            ("Millom", "Cumbria", 54.2019, -3.2690, 6000),
            ("Barrow-in-Furness", "Cumbria", 54.1088, -3.2246, 59826),
            ("Dalton-in-Furness", "Cumbria", 54.1449, -3.1709, 7000),
            ("Ulverston", "Cumbria", 54.1603, -3.1130, 11000),
            ("Grange-over-Sands", "Cumbria", 54.2048, -2.9139, 4000),
            ("Morecambe", "Lancashire", 54.0763, -2.8692, 39000),
            ("Lancaster", "Lancashire", 54.0659, -2.8017, 48000),
            ("Garstang", "Lancashire", 53.8648, -2.5935, 6000),
            ("Fleetwood", "Lancashire", 53.9190, -3.0235, 29000),
        ],
        "Yorkshire and the Humber": [
            ("Beverley", "East Riding of Yorkshire", 53.8404, -0.4294, 30000),
            ("Goole", "East Riding of Yorkshire", 53.7108, -0.7600, 18000),
            ("Hornsea", "East Riding of Yorkshire", 54.0055, -0.2242, 7000),
            ("Withernsea", "East Riding of Yorkshire", 53.7289, 0.1869, 6000),
            ("Bridlington", "East Riding of Yorkshire", 54.1839, -0.1907, 33000),
            ("Filey", "North Yorkshire", 54.2469, -0.2970, 7000),
            ("Scarborough", "North Yorkshire", 54.2808, -0.3884, 61000),
            ("Whitby", "North Yorkshire", 54.4865, -0.6278, 14000),
            ("Harrogate", "North Yorkshire", 53.9904, -1.5370, 76778),
            ("Knaresborough", "North Yorkshire", 54.0009, -1.4719, 14000),
            ("Ripon", "North Yorkshire", 54.1349, -1.5261, 16000),
            ("Thirsk", "North Yorkshire", 54.4351, -1.3541, 4500),
            ("Northallerton", "North Yorkshire", 54.3468, -1.4336, 9000),
            ("Darlington", "County Durham", 54.5225, -1.5507, 99625),
            ("Bedale", "North Yorkshire", 54.3069, -1.6224, 2500),
            ("Leyburn", "North Yorkshire", 54.3351, -1.8168, 2000),
            ("Catterick", "North Yorkshire", 54.3631, -1.6906, 5000),
            ("Richmond", "North Yorkshire", 54.4075, -1.7407, 9000),
            ("Penrith", "Cumbria", 54.6618, -2.7498, 15181),
            ("Hawkshead", "Cumbria", 54.3680, -3.0253, 1000),
        ],
        "North East": [
            ("Hexham", "Northumberland", 54.9690, -2.1014, 11000),
            ("Haltwhistle", "Northumberland", 54.8997, -2.4336, 4000),
            ("Tynemouth", "Tyne and Wear", 55.0147, -1.4226, 68000),
            ("South Shields", "Tyne and Wear", 54.9973, -1.4315, 83000),
            ("Whitley Bay", "Tyne and Wear", 55.0539, -1.4261, 36000),
            ("North Shields", "Tyne and Wear", 55.0168, -1.4432, 37000),
            ("Bedlington", "Northumberland", 55.1326, -1.5450, 16000),
            ("Morpeth", "Northumberland", 55.1728, -1.6829, 15000),
            ("Ashington", "Northumberland", 55.2050, -1.5959, 27000),
            ("Blyth", "Northumberland", 55.1237, -1.5173, 35000),
            ("Newbiggin-by-the-Sea", "Northumberland", 55.1911, -1.4973, 10000),
            ("Amble", "Northumberland", 55.3481, -1.5833, 5000),
            ("Alnwick", "Northumberland", 55.4142, -1.7064, 8000),
            ("Coldstream", "Scottish Borders", 55.6380, -2.2356, 1500),
            ("Berwick-upon-Tweed", "Northumberland", 55.7730, -2.0056, 12000),
            ("Eyemouth", "Scottish Borders", 55.8674, -2.0801, 3000),
            ("Duns", "Scottish Borders", 55.7669, -2.3331, 2500),
            ("Kelso", "Scottish Borders", 55.4508, -2.4136, 5000),
            ("Jedburgh", "Scottish Borders", 55.4806, -2.3592, 4000),
            ("Hawick", "Scottish Borders", 55.4200, -2.7837, 14000),
        ],
        "Wales": [
            ("Brecon", "Powys", 51.9937, -3.3907, 8000),
            ("Welshpool", "Powys", 52.6496, -3.1404, 6000),
            ("Newtown", "Powys", 52.5107, -3.2849, 11000),
            ("Montgomery", "Powys", 52.5719, -3.1325, 1600),
            ("Knighton", "Powys", 52.3238, -3.0401, 3000),
            ("Presteigne", "Powys", 52.1914, -3.0754, 3300),
            ("Builth Wells", "Powys", 52.1206, -3.5738, 2000),
            ("Hay-on-Wye", "Powys", 52.0731, -3.1314, 1900),
            ("Rhayader", "Powys", 52.3054, -3.8238, 2200),
            ("Dolgelley", "Gwynedd", 52.7558, -3.8739, 2500),
            ("Harlech", "Gwynedd", 52.8634, -3.8817, 1600),
            ("Barmouth", "Gwynedd", 52.7197, -3.8917, 2500),
            ("Tywyn", "Gwynedd", 52.5814, -4.0101, 3000),
            ("Machynlleth", "Powys", 52.6010, -3.8525, 2200),
            ("Devil's Bridge", "Ceredigion", 52.3694, -3.7803, 350),
            ("Llandrindod Wells", "Powys", 52.2474, -3.3819, 5000),
            ("Tregaron", "Ceredigion", 52.4442, -3.9188, 1200),
            ("New Quay", "Ceredigion", 52.3819, -4.1775, 1300),
            ("Cardigan", "Ceredigion", 52.0883, -4.1930, 4500),
            ("Lampeter", "Ceredigion", 52.1200, -3.9457, 2500),
        ],
        "Scotland": [
            ("Perth", "Perth and Kinross", 56.3961, -3.4040, 47550),
            ("Stirling", "Stirling", 56.1165, -3.9369, 37350),
            ("Falkirk", "Falkirk", 56.0019, -3.7899, 36000),
            ("Grangemouth", "Falkirk", 56.0177, -3.7143, 18000),
            ("Alloa", "Clackmannanshire", 56.1206, -3.7916, 19000),
            ("Dunfermline", "Fife", 56.0639, -3.4395, 45000),
            ("Kirkcaldy", "Fife", 56.1165, -3.1709, 46000),
            ("Glenrothes", "Fife", 56.1930, -3.1633, 39000),
            ("Lochgelly", "Fife", 56.1705, -3.2920, 6500),
            ("Cowdenbeath", "Fife", 56.1869, -3.3236, 10000),
            ("Leuchars", "Fife", 56.3850, -2.8730, 4000),
            ("Crail", "Fife", 56.2539, -2.6227, 1700),
            ("Anstruther", "Fife", 56.2299, -2.6967, 3500),
            ("Pittenweem", "Fife", 56.2122, -2.7331, 1500),
            ("Elie", "Fife", 56.1981, -2.8039, 1400),
            ("St Andrews", "Fife", 56.3403, -2.7930, 18000),
            ("Cupar", "Fife", 56.3169, -3.0097, 9500),
            ("Newburgh", "Fife", 56.3539, -2.9336, 3000),
            ("Auchtermuchty", "Fife", 56.2942, -3.1833, 2000),
            ("Ladybank", "Fife", 56.3439, -3.1122, 1500),
        ],
        "Northern Ireland": [
            ("Enniskillen", "Fermanagh and Omagh", 54.3397, -7.6360, 13500),
            ("Omagh", "Fermanagh and Omagh", 54.5994, -7.3060, 6200),
            ("Strabane", "Derry", 54.8097, -7.4589, 12700),
            ("Coleraine", "Causeway Coast and Glens", 55.1387, -6.7050, 24000),
            ("Portstewart", "Causeway Coast and Glens", 55.1863, -6.7291, 4500),
            ("Portrush", "Causeway Coast and Glens", 55.2067, -6.6558, 6500),
            ("Bushmills", "Causeway Coast and Glens", 55.2314, -6.5239, 1300),
            ("Ballymoney", "Causeway Coast and Glens", 55.0553, -6.5141, 3200),
            ("Ballycastle", "Causeway Coast and Glens", 55.2080, -6.2418, 3600),
            ("Ballintoy", "Causeway Coast and Glens", 55.2490, -6.3042, 300),
            ("Glenarm", "Mid and East Antrim", 54.9734, -5.8922, 2000),
            ("Carrickfergus", "Antrim and Newtownabbey", 54.7226, -5.8123, 22000),
            ("Whitehead", "Mid and East Antrim", 54.7823, -5.7437, 5000),
            ("Newtownabbey", "Antrim and Newtownabbey", 54.6480, -5.9364, 62000),
            ("Glengormley", "Antrim and Newtownabbey", 54.6579, -5.9259, 20000),
            ("Greenisland", "Antrim and Newtownabbey", 54.6698, -5.8898, 10000},
            ("Jordanstown", "Antrim and Newtownabbey", 54.6852, -5.9261, 5000),
            ("Randalstown", "Antrim and Newtownabbey", 54.6827, -6.0435, 5000),
            ("Dunadry", "Antrim and Newtownabbey", 54.6902, -6.1152, 2000),
            ("Crumlin", "Antrim and Newtownabbey", 54.5788, -5.9629, 7000},
        ],
    }

    towns_to_add = []
    for region, towns_list in regions_towns.items():
        for name, county, lat, lng, population in towns_list:
            towns_to_add.append({
                "name": name,
                "county": county,
                "region": region,
                "lat": lat,
                "lng": lng,
                "population": population,
                "slug": name.lower().replace(" ", "-").replace(".", ""),
                "nearby_towns": []
            })

    return towns_to_add

current_count = len(unique_towns)
additional_new = generate_additional_towns(current_count, 1200)

# Combine and deduplicate
all_towns_combined = unique_towns + additional_new
seen_names = set()
final_towns = []
for town in all_towns_combined:
    if town["name"] not in seen_names:
        seen_names.add(town["name"])
        final_towns.append(town)

# Sort by name
final_towns.sort(key=lambda x: x["name"])

# Write to file
output_file = "/sessions/elegant-sweet-ptolemy/mnt/outputs/assessment-directory/src/data/towns.json"
with open(output_file, 'w') as f:
    json.dump(final_towns, f, indent=2)

print(f"Generated {len(final_towns)} towns")
print(f"File saved to {output_file}")
