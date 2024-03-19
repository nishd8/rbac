import sqlite3
from models.constants import MAIN_DB, RBAC_DB


def rbac_setup():
    con = sqlite3.connect(RBAC_DB)
    cur = con.cursor()
    cur.execute(
        '''CREATE TABLE IF NOT EXISTS features
        (
	        id text PRIMARY KEY,
	        name text NOT NULL,
            description text NOT NULL
        );
        '''
    )
    cur.execute(
        '''CREATE TABLE IF NOT EXISTS roles
        (
	        id text PRIMARY KEY,
	        name text NOT NULL,
            features text
        );
        '''
    )
    con.commit()
    cur.close()
    con.close()


def main_setup():
    con = sqlite3.connect(MAIN_DB)
    cur = con.cursor()
    cur.execute(
        '''CREATE TABLE IF NOT EXISTS users
        (
	        email text PRIMARY KEY,
            password text NOT NULL,
            r_id text
        );
        '''
    )
    con.commit()
    cur.close()
    con.close()


if __name__ == '__main__':
    rbac_setup()
    main_setup()
