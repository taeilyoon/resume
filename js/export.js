// PDF Export Controller
class ExportController {
    constructor(app) {
        this.app = app;
        this.isExporting = false;
        this.exportOptions = {
            format: 'pdf',
            quality: 'high',
            pageSize: 'A4',
            margins: 'minimal'
        };
    }
    
    async exportToPDF(options = {}) {
        if (this.isExporting) return;
        
        this.exportOptions = { ...this.exportOptions, ...options };
        this.isExporting = true;
        
        try {
            this.showExportModal();
            await this.prepareExport();
            await this.generatePDF();
            this.showSuccessMessage();
        } catch (error) {
            console.error('Export failed:', error);
            this.showErrorMessage(error);
        } finally {
            this.isExporting = false;
            this.hideExportModal();
        }
    }
    
    showExportModal() {
        const existingModal = document.querySelector('.export-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>PDF 내보내기</h3>
                <div class="export-options">
                    <div class="option-group">
                        <label>품질</label>
                        <select id="exportQuality">
                            <option value="high">높음</option>
                            <option value="medium">보통</option>
                            <option value="low">낮음</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>여백</label>
                        <select id="exportMargins">
                            <option value="minimal">최소</option>
                            <option value="normal">보통</option>
                            <option value="wide">넓게</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>
                            <input type="checkbox" id="includeBackground" checked>
                            배경색 포함
                        </label>
                    </div>
                    <div class="option-group">
                        <label>
                            <input type="checkbox" id="includeAnimations" checked>
                            애니메이션 효과 제거
                        </label>
                    </div>
                </div>
                <div class="export-actions">
                    <button class="btn btn-cancel" onclick="this.closest('.export-modal').remove()">취소</button>
                    <button class="btn btn-primary" id="exportBtn">내보내기</button>
                </div>
                <div class="export-progress" style="display: none;">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <p class="progress-text">내보내는 중...</p>
                </div>
            </div>
            <div class="modal-backdrop"></div>
        `;
        
        document.body.appendChild(modal);
        this.setupModalEvents(modal);
        
        // Show animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    setupModalEvents(modal) {
        const exportBtn = modal.querySelector('#exportBtn');
        const qualitySelect = modal.querySelector('#exportQuality');
        const marginsSelect = modal.querySelector('#exportMargins');
        const includeBg = modal.querySelector('#includeBackground');
        const includeAnims = modal.querySelector('#includeAnimations');
        
        exportBtn.addEventListener('click', () => {
            this.exportOptions = {
                quality: qualitySelect.value,
                margins: marginsSelect.value,
                includeBackground: includeBg.checked,
                includeAnimations: includeAnims.checked
            };
            
            this.performExport();
        });
        
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            modal.remove();
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.querySelector('.export-modal')) {
                modal.remove();
            }
        });
    }
    
    async performExport() {
        const progressEl = document.querySelector('.export-progress');
        const progressFill = progressEl.querySelector('.progress-fill');
        const progressText = progressEl.querySelector('.progress-text');
        
        progressEl.style.display = 'block';
        progressText.textContent = '준리 중...';
        progressFill.style.width = '10%';
        
        try {
            progressText.textContent = '스타일 적용 중...';
            progressFill.style.width = '30%';
            await this.applyExportStyles();
            
            progressText.textContent = '페이지 렌더링 중...';
            progressFill.style.width = '60%';
            await this.renderPages();
            
            progressText.textContent = 'PDF 생성 중...';
            progressFill.style.width = '90%';
            await this.generatePDF();
            
            progressText.textContent = '완료!';
            progressFill.style.width = '100%';
            
            setTimeout(() => {
                this.hideExportModal();
            }, 1000);
            
        } catch (error) {
            progressText.textContent = '오류 발생';
            progressFill.style.width = '0%';
            throw error;
        }
    }
    
    async applyExportStyles() {
        const { includeBackground, includeAnimations } = this.exportOptions;
        
        if (!includeBackground) {
            document.body.style.background = 'white';
        }
        
        if (!includeAnimations) {
            document.body.classList.add('no-animations');
        }
        
        // Add print styles
        document.body.classList.add('exporting');
        
        // Wait for styles to apply
        await this.delay(100);
    }
    
    async renderPages() {
        // Show all pages for rendering
        document.querySelectorAll('.resume-page').forEach(page => {
            page.classList.add('active', 'rendering');
        });
        
        // Wait for rendering to complete
        await this.delay(500);
        
        // Remove rendering class
        document.querySelectorAll('.resume-page').forEach(page => {
            page.classList.remove('rendering');
        });
    }
    
    async generatePDF() {
        // Check if running in browser environment
        if (typeof window === 'undefined') return;
        
        // Try different PDF generation methods
        if (this.canUseWindowPrint()) {
            await this.generateWithPrint();
        } else if (this.canUseHtml2Canvas()) {
            await this.generateWithCanvas();
        } else {
            await this.generateWithServerSide();
        }
    }
    
    canUseWindowPrint() {
        return true; // Always available in browser
    }
    
    async generateWithPrint() {
        return new Promise((resolve) => {
            const originalTitle = document.title;
            document.title = `윤태일_이력서_${new Date().toISOString().split('T')[0]}`;
            
            window.print();
            
            // Wait for print dialog to close
            setTimeout(() => {
                document.title = originalTitle;
                resolve();
            }, 1000);
        });
    }
    
    canUseHtml2Canvas() {
        return false; // We're not using external libraries
    }
    
    async generateWithCanvas() {
        throw new Error('Canvas method not implemented without external library');
    }
    
    async generateWithServerSide() {
        throw new Error('Server-side export not available');
    }
    
    hideExportModal() {
        const modal = document.querySelector('.export-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        
        // Clean up export styles
        document.body.classList.remove('exporting', 'no-animations');
        document.body.style.background = '';
    }
    
    showSuccessMessage() {
        this.showToast('PDF가 성공적으로 생성되었습니다!', 'success');
    }
    
    showErrorMessage(error) {
        this.showToast(`PDF 생성 실패: ${error.message}`, 'error');
    }
    
    showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || icons.info;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Advanced export features
    async exportWithWatermark(watermarkText = '윤태일 이력서') {
        try {
            this.applyWatermark(watermarkText);
            await this.exportToPDF();
            this.removeWatermark();
        } catch (error) {
            console.error('Watermark export failed:', error);
            throw error;
        }
    }
    
    applyWatermark(text) {
        const watermark = document.createElement('div');
        watermark.className = 'export-watermark';
        watermark.innerHTML = `
            <div class="watermark-content">
                ${text}
                <small>${new Date().toLocaleDateString('ko-KR')}</small>
            </div>
        `;
        watermark.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 72px;
            color: rgba(0, 0, 0, 0.1);
            font-weight: bold;
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
        `;
        
        document.body.appendChild(watermark);
    }
    
    removeWatermark() {
        const watermark = document.querySelector('.export-watermark');
        if (watermark) {
            watermark.remove();
        }
    }
    
    async exportToImage(format = 'png') {
        try {
            await this.applyExportStyles();
            await this.renderPages();
            
            if (format === 'png') {
                await this.exportAsPNG();
            } else if (format === 'jpg') {
                await this.exportAsJPG();
            }
            
            this.cleanupExport();
        } catch (error) {
            this.cleanupExport();
            throw error;
        }
    }
    
    async exportAsPNG() {
        throw new Error('PNG export requires external library');
    }
    
    async exportAsJPG() {
        throw new Error('JPG export requires external library');
    }
    
    cleanupExport() {
        document.body.classList.remove('exporting', 'no-animations');
        document.body.style.background = '';
    }
    
    // Export presets
    async exportForPrint() {
        return this.exportToPDF({
            quality: 'high',
            margins: 'minimal',
            includeBackground: false,
            includeAnimations: false
        });
    }
    
    async exportForEmail() {
        return this.exportToPDF({
            quality: 'medium',
            margins: 'normal',
            includeBackground: true,
            includeAnimations: false
        });
    }
    
    async exportForWeb() {
        return this.exportToPDF({
            quality: 'low',
            margins: 'minimal',
            includeBackground: true,
            includeAnimations: true
        });
    }
}

// Utility functions for export
function createExportModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .export-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .export-modal.show {
            opacity: 1;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background: var(--bg-primary);
            border-radius: 12px;
            padding: 32px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--border-color);
            position: relative;
            z-index: 1;
        }
        
        .modal-content h3 {
            margin-bottom: 24px;
            color: var(--text-primary);
        }
        
        .export-options {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 24px;
        }
        
        .option-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .option-group label {
            font-weight: 500;
            color: var(--text-primary);
        }
        
        .option-group select {
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-secondary);
            color: var(--text-primary);
        }
        
        .option-group input[type="checkbox"] {
            margin-right: 8px;
        }
        
        .export-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .btn {
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .btn-cancel {
            background: var(--bg-secondary);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
        }
        
        .btn-primary {
            background: var(--primary-color);
            color: white;
            border: none;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .export-progress {
            text-align: center;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 12px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(to right, var(--primary-color), var(--accent-color));
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .progress-text {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .exporting .resume-page {
            display: block !important;
        }
        
        .no-animations * {
            animation: none !important;
            transition: none !important;
        }
        
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10001;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .toast.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: var(--bg-primary);
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
        }
        
        .toast-success .toast-content {
            color: var(--success-color);
        }
        
        .toast-error .toast-content {
            color: var(--error-color);
        }
        
        .toast-info .toast-content {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}

// Initialize export styles
document.addEventListener('DOMContentLoaded', () => {
    createExportModalStyles();
});