from __future__ import annotations

"""Vercel Python Functions entrypoint for the CarbonCAM FastAPI service."""

from fastapi import FastAPI

from main import app as carboncam_app

app = FastAPI()
app.mount("/api/python", carboncam_app)
