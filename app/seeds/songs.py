from app.models import db, Song


def seed_songs():
    peaches = Song(
        api_id="4iJyoBOLtHqaGxP12qzhQI",
        song_name="Peaches (feat. Daniel Caesar & Giveon)",
        artist_name="Justin Bieber",
        image_url="https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431",
        duration_ms=198081
    )

    drivers_license = Song(
        api_id="7lPN2DXiMsVn7XUKtOW1CS",
        song_name="drivers license",
        artist_name="Olivia Rodrigo",
        image_url="https://i.scdn.co/image/ab67616d0000b2738ffc294c1c4362e8472d14cd",
        duration_ms=242013
    )

    astronaut_in_the_ocean = Song(
        api_id="3Ofmpyhv5UAQ70mENzB277",
        song_name="Astronaut In The Ocean",
        artist_name="Masked Wolf",
        image_url="https://i.scdn.co/image/ab67616d0000b27384350b406522fc53c1b2a621",
        duration_ms=132780
    )

    save_your_tears = Song(
        api_id="5QO79kh1waicV47BqGRL3g",
        song_name="Save Your Tears",
        artist_name="The Weeknd",
        image_url="https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        duration_ms=215626

    )

    telepatia = Song(
        api_id="6tDDoYIxWvMLTdKpjFkc1B",
        song_name="telepatía",
        artist_name="Kali Uchis",
        image_url="https://i.scdn.co/image/ab67616d0000b273044a5466dac00f7b3c570b99",
        duration_ms=160191,

    )

    blinding_lights = Song(
        api_id="0VjIjW4GlUZAMYd2vXMi3b",
        song_name="Blinding Lights",
        artist_name="The Weeknd",
        image_url="https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        duration_ms=200040
    )

    leave_the_door_open = Song(
        api_id="7MAibcTli4IisCtbHKrGMh",
        song_name="Leave The Door Open",
        artist_name="Bruno Mars",
        image_url="https://i.scdn.co/image/ab67616d0000b2736f9e6abbd6fa43ac3cdbeee0",
        duration_ms=242096,
    )

    the_business = Song(
        api_id="6f3Slt0GbA2bPZlz0aIFXN",
        song_name="The Business",
        artist_name="Tiësto",
        image_url="https://i.scdn.co/image/ab67616d0000b273f461bbc21a9bcec43a926973",
        duration_ms=164000,
    )

    streets = Song(
        api_id="60ynsPSSKe6O3sfwRnIBRf",
        song_name="Streets",
        artist_name="Doja Cat",
        image_url="https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
        duration_ms=226986,
    )

    heartbreak_anniversary = Song(
        api_id="3FAJ6O0NOHQV8Mc5Ri6ENp",
        song_name="Heartbreak Anniversary",
        artist_name="Giveon",
        image_url="https://i.scdn.co/image/ab67616d0000b27318ff322fcdd47c9400872da6",
        duration_ms=198370,
    )

    without_you = Song(
        api_id="27OeeYzk6klgBh83TSvGMA",
        song_name="WITHOUT YOU",
        artist_name="The Kid LAROI",
        image_url="https://i.scdn.co/image/ab67616d0000b273df16d539f508603bfb1efe02",
        duration_ms=161384,
    )

    bandido = Song(
        api_id="1xK1Gg9SxG8fy2Ya373oqb",
        song_name="Bandido",
        artist_name="Myke Towers",
        image_url="https://i.scdn.co/image/ab67616d0000b273069e5634bc475b5c0436a3ce",
        duration_ms=232853,
    )

    fiel = Song(
        api_id="7Bk0uXKk1uPT0XuQbpFzvs",
        song_name="Fiel",
        artist_name="Los Legendarios",
        image_url="https://i.scdn.co/image/ab67616d0000b27350c22294cd0ef1271dd7df3c",
        duration_ms=261665,
    )

    friday = Song(
        api_id="4cG7HUWYHBV6R6tHn1gxrl",
        song_name="Friday (feat. Mufasa & Hypeman) - Dopamine Re-Edit",
        artist_name="Riton",
        image_url="https://i.scdn.co/image/ab67616d0000b273815cb538fd7821595b2bc8c5",
        duration_ms=169153,
    )

    la_noche_de_anoche = Song(
        api_id="2XIc1pqjXV3Cr2BQUGNBck",
        song_name="LA NOCHE DE ANOCHE",
        artist_name="Bad Bunny",
        image_url="https://i.scdn.co/image/ab67616d0000b273005ee342f4eef2cc6e8436ab",
        duration_ms=203200,
    )

    good_days = Song(
        api_id="3YJJjQPAbDT7mGpX3WtQ9A",
        song_name="Good Days",
        artist_name="SZA",
        image_url="https://i.scdn.co/image/ab67616d0000b2733097b1375ab17ae5bf302a0a",
        duration_ms=279204,
    )

    watermelon_sugar = Song(
        api_id="6UelLqGlWMcVH1E5c4H7lY",
        song_name="Watermelon Sugar",
        artist_name="Harry Styles",
        image_url="https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
        duration_ms=174000,
    )

    dakiti = Song(
        api_id="47EiUVwUp4C9fGccaPuUCS",
        song_name="DÁKITI",
        artist_name="Bad Bunny",
        image_url="https://i.scdn.co/image/ab67616d0000b27334c8199b0b3b3fb42b8a98a8",
        duration_ms=205090,
    )

    positions = Song(
        api_id="35mvY5S1H3J2QZyna3TFe0",
        song_name="positions",
        artist_name="Ariana Grande",
        image_url="https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605",
        duration_ms=172324,
    )

    hecha_pa_mi = Song(
        api_id="3VvA1wSxukMLsvXoXtlwWx",
        song_name="Hecha Pa' Mi",
        artist_name="Boza",
        image_url="https://i.scdn.co/image/ab67616d0000b2735921096535733d90092393b6",
        duration_ms=186133,
    )

    db.session.add(peaches)
    db.session.add(drivers_license)
    db.session.add(astronaut_in_the_ocean)
    db.session.add(save_your_tears)
    db.session.add(telepatia)
    db.session.add(blinding_lights)
    db.session.add(leave_the_door_open)
    db.session.add(the_business)
    db.session.add(streets)
    db.session.add(heartbreak_anniversary)

    db.session.add(without_you)
    db.session.add(bandido)
    db.session.add(fiel)
    db.session.add(friday)
    db.session.add(la_noche_de_anoche)
    db.session.add(good_days)
    db.session.add(watermelon_sugar)
    db.session.add(dakiti)
    db.session.add(positions)
    db.session.add(hecha_pa_mi)

    db.session.commit()


def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
