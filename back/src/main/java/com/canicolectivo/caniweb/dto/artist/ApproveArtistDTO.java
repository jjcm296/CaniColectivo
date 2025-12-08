package com.canicolectivo.caniweb.dto.artist;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public class ApproveArtistDTO {
    @NotNull(message = "isApproved field is required")
    @JsonProperty("isApproved")
    private Boolean isApproved;

    public ApproveArtistDTO() {}

    public ApproveArtistDTO(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public @NotNull(message = "isApproved field is required") Boolean getApproved() {
        return isApproved;
    }

    public void setApproved(@NotNull(message = "isApproved field is required") Boolean isApproved) {
        this.isApproved = isApproved;
    }
}
