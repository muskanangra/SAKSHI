import sys
import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.config import settings
from app.models import Base
from app.seed import seed_db

@pytest.fixture(scope="session")
def engine_fixture():
    engine = create_engine(settings.DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    yield engine

@pytest.fixture(scope="function")
def db_session(engine_fixture):
    connection = engine_fixture.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()

    # Seed initial roles and districts if empty
    seed_db(session)

    yield session

    session.close()
    transaction.rollback()
    connection.close()
