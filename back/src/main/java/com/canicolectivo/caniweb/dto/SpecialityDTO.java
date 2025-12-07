package com.canicolectivo.caniweb.dto;

import com.canicolectivo.caniweb.Enum.TypeSpeciality;
import com.canicolectivo.caniweb.model.Speciality;

public class SpecialityDTO {
    private Integer id;
    private String name;
    private TypeSpeciality type;

    public SpecialityDTO() {}

    public SpecialityDTO(int id, String name, TypeSpeciality type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public static SpecialityDTO formEntity(Speciality entity) {
        return new SpecialityDTO(entity.getId(), entity.getName(), entity.getType());
    }

    public Speciality toEntity() {
        Speciality entity = new Speciality();
        entity.setName(this.name);
        entity.setType(this.type);
        return entity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypeSpeciality getType() {
        return type;
    }

    public void setType(TypeSpeciality type) {
        this.type = type;
    }
}
