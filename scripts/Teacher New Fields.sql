-- Table: public."Teacher"

-- DROP TABLE public."Teacher";

CREATE TABLE public."Teacher"
(
    "TeacherId" integer NOT NULL DEFAULT nextval('"Teacher_TeacherId_seq"'::regclass),
    "Name" character varying(150) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Gender" character varying(6) COLLATE pg_catalog."default",
    "IDNo" character varying(30) COLLATE pg_catalog."default",
    "Rating" integer,
    "Nationality" integer,
    "DOB" date,
    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("TeacherId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Teacher"
    OWNER to sa;