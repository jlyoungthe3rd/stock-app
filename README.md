## WSB App

## Purpose

The purpose of this application is to display a side by side of threads in the wallstreetbets subreddit
next to live stock data related to each thread.

MiroBoard: https://miro.com/app/board/o9J_kkh1i50=/

WallstreetBets Subreddit: https://reddit.com/r/wallstreetbets

Firebase Project: https://console.firebase.google.com/project/hen-in-a-bullhouse/

## TODOs

1. Create a function as a service (endpoint) that will retrieve wallstreet bets threads
2. Create an interface to view each thread in a list form
3. Create a function as a service that will retrrive stock data from a list of symbols
4. Create an interface to view each symbol
    - size relative to market cap
    - height realtive to the difference in price from the beginning of the week to current day
4. (?) How should we store/cache data from reddit and the stocks in a cheap way?
    - Make this an easily removable feature (holding data could cost money/a bunch of requests could too)
5. (?) Do we need this to be live or a past view?
    - Hourly? Daily?
    - Make this adjustable

