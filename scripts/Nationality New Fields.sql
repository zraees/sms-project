-- Table: public."Nationality"

-- DROP TABLE public."Nationality";

CREATE TABLE public."Nationality"
(
    "NationalityId" serial NOT NULL,
    "Nationality" character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Nationality_pkey" PRIMARY KEY ("NationalityId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Nationality"
    OWNER to sa;